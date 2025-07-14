import axios from 'axios';
import { MythicPlusInfoDto } from '../dtos/MythicPlusInfo.dto';
import { getAccessToken } from './getAccessToken';

export async function getCharacterMythicPlusInfo(
	seasonId: number,
	realm: string,
	characterName: string,
): Promise<MythicPlusInfoDto> {
	const token = await getAccessToken();

	const url = `https://eu.api.blizzard.com/profile/wow/character/${realm.toLowerCase()}/${characterName.toLowerCase()}/mythic-keystone-profile/season/${seasonId}`;

	const params = {
		namespace: 'profile-eu',
		locale: 'en_US',
	};
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	try {
		const response: MythicPlusInfoDto = (await axios.get(url, { params, headers })).data;

		return response;
	} catch (error: any) {
		console.error(
			'Ошибка при получении данных:',
			error.response?.data || error.message || error,
		);
		const reason: string = (error.response?.data || error.message || error).detail;
		throw new Error(reason);
	}
}
