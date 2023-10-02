import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { getLinkedInEmailAddress, getLinkedInProfile, loginLinkedIn } from 'src/microservices/linkedin/api/linkedin.api';

import { LinkedInUserTokenObject } from '../objects/linkedin-user-token.object';
import { LinkedInUserProfileObject } from '../objects/linkedin-user-profile.object';

@Injectable()
export class LinkedInService {
    constructor() {}

    async login(authorizationCode: string): Promise<LinkedInUserTokenObject> {
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

    async getProfile(accessToken: string): Promise<LinkedInUserProfileObject> {
        /* (1) Get email of LinkedIn client */
        const req1 = await getLinkedInEmailAddress(accessToken);
        const email = req1?.data?.elements[0]['handle~'].emailAddress;

        /* (2) Get (first/last)name and profile image of LinkedIn client */
        const req2 = await getLinkedInProfile(accessToken);
        const firstName = req2?.data?.firstName?.localized?.fr_FR;
        const lastName = req2?.data?.lastName?.localized?.fr_FR;
        const profileImageUrl = req2?.data?.profilePicture['displayImage~']?.elements[0]?.identifiers[0]?.identifier;
    
        if (!firstName || !lastName || !profileImageUrl || !email) throw new InternalServerErrorException('An error occured while parsing the retrieved profile from LinkedIn!');
        return {
            firstName,
            lastName,
            email,
            profileImageUrl,
        }
    }
}
