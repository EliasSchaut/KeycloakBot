import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import { RegistrationDto } from '@/types/registration.dto';

@Injectable()
export class KeycloakService {

  private readonly ADMIN_ROUTE_BASE = `${process.env.KEYCLOAK_BASE_API}/admin/realms/${process.env.KEYCLOAK_REALM}/`;
  private readonly LOGIN_ROUTE = `${process.env.KEYCLOAK_BASE_API}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

  public invite_user(dto: RegistrationDto): Promise<Response> {
    const form = new URLSearchParams();
    form.append('email', dto.email);
    form.append('first_name', dto.first_name);
    form.append('last_name', dto.last_name);

    return this.call_api(`organizations/${process.env.KEYCLOAK_ORGANISATION_ID}/members/invite-user`, 'POST', form.toString())
  }

  private async call_api(url: string, method: string = 'POST', body: any): Promise<Response> {
    const access_token = await this.get_bearer_token();
    return await fetch(this.ADMIN_ROUTE_BASE + url, {
      method,
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      body: body,
    });
  }

  private async get_bearer_token(): Promise<string> {
    const params = new URLSearchParams();
    params.append('client_id', 'admin-cli');
    params.append('username', process.env.KEYCLOAK_ADMIN_USERNAME as string);
    params.append('password', process.env.KEYCLOAK_ADMIN_PASSWORD as string);
    params.append('grant_type', 'password');

    const res = await fetch(this.LOGIN_ROUTE, {
      method: 'POST',
      headers: { "Content-Type": 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    const body = await res.json();
    return body.access_token;
  }

}