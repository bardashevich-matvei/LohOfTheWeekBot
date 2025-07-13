import { CharacterModel } from '../mongoDB/schemas/character.schema';

export async function updateOrCreateOne(realm: string, username: string, rio?: number) {
	await CharacterModel.updateOne(
		{
			username,
			realm,
		},
		{
			$set: {
				username,
				realm,
				rio: rio ?? 0,
			},
		},
		{
			upsert: true,
		},
	);
}

export async function deleteOne(realm: string, username: string) {
	await CharacterModel.deleteOne({
		username,
		realm,
	});
}
