import { MiddlewareFn } from 'telegraf';
import { MythicPlusInfoDto } from '../../dtos/MythicPlusInfo.dto';
import { addSeason, findLastSeason } from '../../repositories/season';
import { getCharacterInfo } from '../../requests/getCharacterInfo';
import { getCharacterMythicPlusInfo } from '../../requests/getCharacterMythicPlusInfo';
import { getCurrentSeasonIndex } from '../../requests/getCurrentSeasonInfo';
import { RioContext } from '../../types';
import { checkNameAndRealm } from '../../validation/basic';

function findBestKey(data: MythicPlusInfoDto) {
	let bestKey = { rating: 0, keystone_level: 0, name: 'empty' };

	data.best_runs.forEach((item) => {
		if (
			item.is_completed_within_time &&
			item.keystone_level > bestKey.keystone_level &&
			item.map_rating.rating > bestKey.rating
		) {
			bestKey = {
				name: item.dungeon.name,
				rating: item.map_rating.rating,
				keystone_level: item.keystone_level,
			};
		}
	});

	return bestKey;
}

export const getCharacterRio: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	let message;
	try {
		message = await ctx.reply('⏳ Загрузка информации...');

		const { characterName, realmName } = await checkNameAndRealm(ctx);
		const info = await getCharacterInfo(realmName, characterName);
		let lastSeason = (await findLastSeason())?.id;
		if (!lastSeason) {
			lastSeason = await getCurrentSeasonIndex();
			await addSeason(lastSeason);
		}

		const mythicPlusInfo = await getCharacterMythicPlusInfo(
			lastSeason,
			realmName,
			characterName,
		);
		const bestKey = findBestKey(mythicPlusInfo);

		const rio = info.current_mythic_rating.rating ?? 0;
		const text =
			bestKey.rating > 0 ? `+${bestKey.keystone_level} ${bestKey.name}` : 'А такого и нет :(';

		await ctx.telegram.editMessageText(
			ctx.chat?.id,
			message.message_id,
			undefined,
			`✅ Готово!\nТекущий рио: ${rio}\nЛучший ключ: ${text}`,
		);
	} catch (error) {
		await ctx.telegram.editMessageText(
			ctx.chat?.id,
			message?.message_id,
			undefined,
			`❌ Ошибка!\n${error}`,
		);
	} finally {
		return ctx.scene.leave(); // завершаем сцену
	}
};
