import { Injectable } from '@nestjs/common';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { AzureUser } from './user';

const clientID = process.env.AAD_CLIENT_ID;
const tenantID = process.env.AAD_TENANT_ID;

/**
 * Extracts ID token from header and validates it.
 */
@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, 'aad') {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${ tenantID }/v2.0/.well-known/openid-configuration`,
      clientID
    });
  }

  async validate(data: AzureUser) {
    return data;
  }
}

export const AzureADGuard = AuthGuard('aad');
