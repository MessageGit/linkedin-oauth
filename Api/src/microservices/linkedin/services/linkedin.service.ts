import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginLinkedIn } from 'src/microservices/linkedin/api/linkedin.api';
import { LoginLinkedinResponseObject } from '../objects/login-linkedin-response.object';

@Injectable()
export class LinkedInService {
    constructor() {}

    async login(authorizationCode: string): Promise<LoginLinkedinResponseObject> {
        try {
            const response = await loginLinkedIn(authorizationCode);
            const accessToken = response?.data?.access_token;
            return {
                accessToken,
                expireIn: response?.data?.expires_in,
            }
        } catch (err) {
            throw new UnauthorizedException('Unable to login as LinkedIn user from the provided authorization code!');
        }
    }
}
