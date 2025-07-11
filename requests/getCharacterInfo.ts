import axios from 'axios';
import { CharacterRioInfoDto } from '../dtos/CharacterRioInfoDto.dto';
import { CharacterModel } from '../mongoDB/schemas/character.schema';
import { getAccessToken } from './getAccessToken';

export async function getCharacterInfo(realm: string, characterName: string): Promise<any> {
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

		console.log('Рейтинг: ', response.current_mythic_rating.rating);

		await CharacterModel.updateOne(
			{
				username: response.character.name,
				realm: response.character.realm.name,
			},
			{
				$set: {
					username: response.character.name,
					realm: response.character.realm.name,
					rio: response.current_mythic_rating.rating,
				},
			},
			{
				upsert: true,
			},
		);

		return `${Math.round(response.current_mythic_rating.rating)} rio`;
	} catch (error: any) {
		console.error(
			'Ошибка при получении данных:',
			error.response?.data || error.message || error,
		);
		throw new Error('Ошибка при получении данных');
	}
}
