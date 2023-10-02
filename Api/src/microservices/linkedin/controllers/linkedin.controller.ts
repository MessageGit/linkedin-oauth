import { Body, Controller, Post } from '@nestjs/common';

import { LinkedInService } from 'src/microservices/linkedin/services/linkedin.service';
import { LinkedInUserTokenObject } from '../objects/linkedin-user-token.object';
import { LinkedInUserProfileObject } from '../objects/linkedin-user-profile.object';

@Controller('linkedin')
export class LinkedInController {
  constructor(private readonly linkedInService: LinkedInService) {}

  @Post('auth/login')
  async login(@Body('authorization_code') authorizationCode: string): Promise<any> {
    const token: LinkedInUserTokenObject = 
        await this.linkedInService.login(authorizationCode); // Get permissions from LinkedIn server(s)
    const profile: LinkedInUserProfileObject = 
        await this.linkedInService.getProfile(token.accessToken); // Get profile from LinkedIn server(s)
    return profile;
  }

}
