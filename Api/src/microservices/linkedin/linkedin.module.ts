import { Module } from '@nestjs/common';

import { LinkedInController } from 'src/microservices/linkedin/controllers/linkedin.controller';
import { LinkedInService } from 'src/microservices/linkedin/services/linkedin.service';

@Module({
  imports: [],
  controllers: [LinkedInController],
  providers: [LinkedInService],
})
export class LinkedInModule {}
