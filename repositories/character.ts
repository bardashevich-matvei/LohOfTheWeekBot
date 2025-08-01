import { CharacterModel } from '../mongoDB/schemas/character.schema';

export async function updateOrCreateOne(realm: string, username: string, rio?: number) {
	return CharacterModel.updateOne(
		{
			username: new RegExp(`^${username}$`, 'i'),
			realm: new RegExp(`^${realm}$`, 'i'),
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
	return CharacterModel.deleteOne({
		username: new RegExp(`^${username}$`, 'i'),
		realm: new RegExp(`^${realm}$`, 'i'),
	});
}
