import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { Injectable, } from '@nestjs/common';
import { InteractionReplyOptions } from 'discord.js';
import { RegistrationDto } from '@/types/registration.dto';
import { KeycloakService } from '@/common/keycloak.service';


@Injectable()
@Command({
  name: 'sso_invite',
  description: 'Send yourself an invite link to create a sso account',
})
export class SSOInviteCommand {

  constructor(private readonly keycloakService: KeycloakService) {
  }

  @Handler()
  async handler(
    @IA(SlashCommandPipe) dto: RegistrationDto,
  ): Promise<InteractionReplyOptions> {
    const res = await this.keycloakService.invite_user(dto);
    if (res.ok) {
      return { content: `E-Mail sent to ${dto.email}. Please check your inbox!`, flags: 'Ephemeral' };
    } else {
      return { content: `Error: ${(await res.json())?.errorMessage ?? `Unknown`}`, flags: 'Ephemeral' };
    }
  }

}