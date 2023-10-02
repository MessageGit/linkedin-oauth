import { Body, Controller, Post } from '@nestjs/common';

import { LinkedInService } from 'src/microservices/linkedin/services/linkedin.service';
import { LoginLinkedinResponseObject } from '../objects/login-linkedin-response.object';

@Controller('linkedin')
export class LinkedInController {
  constructor(private readonly linkedInService: LinkedInService) {}

  @Post('auth/login')
  async login(@Body('authorization_code') authorizationCode: string): Promise<any> {
    const session: LoginLinkedinResponseObject = await this.linkedInService.login(authorizationCode);
    return session;
  }

}
