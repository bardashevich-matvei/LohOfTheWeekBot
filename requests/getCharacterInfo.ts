import axios from 'axios';
import { CharacterRioInfoDto } from '../dtos/CharacterRioInfoDto.dto';
import { getAccessToken } from './getAccessToken';

export async function getCharacterInfo(
	realm: string,
	characterName: string,
): Promise<CharacterRioInfoDto> {
	const token = await getAccessToken();

	const url = `https://eu.api.blizzard.com/profile/wow/character/${realm.toLowerCase()}/${characterName.toLowerCase()}/mythic-keystone-profile`;

	const params = {
		namespace: 'profile-eu',
		locale: 'en_US',
	};
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	try {
		const response: CharacterRioInfoDto = (await axios.get(url, { params, headers })).data;

		return response;
	} catch (error: any) {
		console.error(
			'Ошибка при получении данных:',
			error.response?.data || error.message || error,
		);
		throw new Error('Ошибка при получении данных');
	}
}
