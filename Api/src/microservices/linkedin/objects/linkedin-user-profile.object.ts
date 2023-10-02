import { IsNumber, IsString } from "class-validator";

export class LinkedInUserProfileObject {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    profileImageUrl: string;
}
