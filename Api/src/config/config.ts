interface LinkedInConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

interface ConfigProps {
    port: number;
    linkedIn: LinkedInConfig;
}

export const config = (): ConfigProps => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    linkedIn: {
        clientId: process.env.LINKEDIN_API_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_API_CLIENT_SECRET,
        redirectUri: process.env.LINKEDIN_API_REDIRECT_URI,
    }
});