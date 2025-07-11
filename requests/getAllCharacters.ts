import { CharacterModel } from '../mongoDB/schemas/character.schema';

export async function getAllCharacters() {
	try {
		return await CharacterModel.find().sort({ rio: -1 }).limit(50).lean();
	} catch (error: any) {
		console.error('Ошибка получения данных:', error.response?.data || error.message || error);
		throw new Error('Ошибка получения данных');
	}
}
