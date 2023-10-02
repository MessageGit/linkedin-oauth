import { IsNumber, IsString } from "class-validator";

export class LinkedInUserTokenObject {
    @IsString()
    accessToken: string;

    @IsNumber()
    expireIn: number;
}
