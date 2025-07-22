import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { CommandModule } from '@/commands/command.module';
import * as process from 'node:process';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: process.env.BOT_TOKEN as string,
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds],
        },
      }),
    }),
    CommandModule
  ],
})
export class AppModule {
}
