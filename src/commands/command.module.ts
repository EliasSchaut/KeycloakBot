import { Module } from '@nestjs/common';
import { KeycloakService } from '@/common/keycloak.service';
import { SSOInviteCommand } from '@/commands/sso_invite.command';
import { DiscordModule, ReflectMetadataProvider } from '@discord-nestjs/core';

@Module({
  imports: [
    DiscordModule.forFeature()
  ],
  providers: [SSOInviteCommand, KeycloakService, ReflectMetadataProvider]
})
export class CommandModule {}
