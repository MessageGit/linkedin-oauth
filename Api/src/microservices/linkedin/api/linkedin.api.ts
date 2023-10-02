import { ConfigService } from "@nestjs/config";
import axios from "axios";

/* (1) LinkedIn API | global endpoint */
const linkedInAPI = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://api.linkedin.com/v2',
        withCredentials: true,
    });
    return axiosInstance;
}
/* [LinkedIn] Get email address */
export const getLinkedInEmailAddress = async (accessToken: string) => 
    linkedInAPI().get(`/emailAddress?q=members&projection=(elements*(handle~))`, {headers: { Authorization: `Bearer ${accessToken}` }});
/* [LinkedIn] Get (first/last)name and profile picture */
export const getLinkedInProfile = async (accessToken: string) => 
    linkedInAPI().get(`/me?projection=(id,firstName,lastName,emailAddress,profilePicture(displayImage~:playableStreams))`, {headers: { Authorization: `Bearer ${accessToken}` }});


/* (2) Authentication */
const linkedInAuthentication = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://www.linkedin.com/oauth/v2',
        withCredentials: true,
    });
    return axiosInstance;
}
export const loginLinkedIn = async (code: string) => /* Get accessToken from an authorization code */
    await linkedInAuthentication().get('/accessToken', {
        params: {
            grant_type: 'authorization_code',
            client_id: new ConfigService().get('LINKEDIN_API_CLIENT_ID'),
            client_secret: new ConfigService().get('LINKEDIN_API_CLIENT_SECRET'),
            code,
            redirect_uri: new ConfigService().get('LINKEDIN_API_REDIRECT_URI'),
        },
    });
export const checkSessionValidity = async (accessToken: string) => {/* Introspect and verify an accessToken */
    const body = {
        client_id: new ConfigService().get('LINKEDIN_API_CLIENT_ID'),
        client_secret: new ConfigService().get('LINKEDIN_API_CLIENT_SECRET'),
        token: accessToken,
    };
    return await linkedInAuthentication().post('/introspectToken', new URLSearchParams(body), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
}