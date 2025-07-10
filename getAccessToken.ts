import axios from 'axios';
import * as dotenv from 'dotenv';
import * as qs from 'querystring';
dotenv.config();

const CLIENT_ID = process.env.BLIZZARD_CLIENT_ID!;
const CLIENT_SECRET = process.env.BLIZZARD_CLIENT_SECRET!;

let cachedToken: string | null = null;
let tokenExpiry: number = 0; // UNIX timestamp в миллисекундах

export async function getAccessToken(): Promise<string> {
    const now = Date.now();

    if (cachedToken && now < tokenExpiry) {
        return cachedToken;
    }

    try {
        const response = await axios.post(
            'https://oauth.battle.net/token',
            qs.stringify({ grant_type: 'client_credentials' }),
            {
                auth: {
                    username: CLIENT_ID,
                    password: CLIENT_SECRET
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const { access_token, expires_in } = response.data;

        cachedToken = access_token as string;
        tokenExpiry = now + expires_in * 1000 - 60_000; // минус 60 сек "на всякий случай"

        console.log('[Auth] Новый токен получен');
        return cachedToken;
    } catch (error: any) {
        console.error(error?.data?.data);
        throw new Error('Не удалось получить access token');
    }
}