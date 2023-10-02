import { IsNumber, IsString } from "class-validator";

export class LoginLinkedinResponseObject {
    @IsString()
    accessToken: string;

    @IsNumber()
    expireIn: number;
}
