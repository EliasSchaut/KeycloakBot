import { Param } from '@discord-nestjs/core';
import { IsEmail } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  @Param({ name: 'email', description: 'E-Mail', required: true })
  email!: string;

  @Param({ name: 'first-name', description: 'First Name', required: false })
  first_name!: string;

  @Param({ name: 'last-name', description: 'Last Name', required: false })
  last_name!: string;
}