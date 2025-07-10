import axios from "axios";
import { CharacterRioInfoDto } from "./dtos/CharacterRioInfoDto.dto";
import { getAccessToken } from "./getAccessToken";

export async function getCharacterInfo(realm: string, characterName: string): Promise<any> {
    const token = await getAccessToken();

    const url = `https://eu.api.blizzard.com/profile/wow/character/${realm.toLowerCase()}/${characterName.toLowerCase()}/mythic-keystone-profile`;
    
    const params = {
        namespace: 'profile-eu',
        locale: 'en_US',
    };
    const headers = {
        Authorization: `Bearer ${token}`
    }

    try {
        const response: CharacterRioInfoDto = (await axios.get(url, { params, headers })).data;
        console.log('Рейтинг: ', response.current_mythic_rating.rating);
        return response.current_mythic_rating.rating;
    } catch (error: any) {
        console.error('Ошибка при получении данных:', error.response?.data || error.message || error);
        return 'Ошибка при получении данных';
    }
}