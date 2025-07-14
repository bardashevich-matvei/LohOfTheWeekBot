import axios from 'axios';
import { SeasonIndexDto } from '../dtos/SeasonIndex.dto';
import { getAccessToken } from './getAccessToken';

export async function getCurrentSeasonIndex(): Promise<number> {
	const token = await getAccessToken();

	const url = `https://eu.api.blizzard.com/data/wow/mythic-keystone/season/index`;

	const params = {
		namespace: 'dynamic-eu',
		locale: 'en_US',
	};
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	try {
		const response: SeasonIndexDto = (await axios.get(url, { params, headers })).data;

		return response.current_season.id;
	} catch (error: any) {
		console.error(
			'Ошибка при получении данных:',
			error.response?.data || error.message || error,
		);
		const reason: string = (error.response?.data || error.message || error).detail;
		throw new Error(reason);
	}
}
