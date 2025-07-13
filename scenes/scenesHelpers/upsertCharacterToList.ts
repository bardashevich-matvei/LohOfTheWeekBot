import { MiddlewareFn } from 'telegraf';
import { updateOrCreateOne } from '../../repositories/character';
import { getCharacterInfo } from '../../requests/getCharacterInfo';
import { RioContext } from '../../types';
import { checkNameAndRealm } from '../../validation/basic';

export const upsertCharacterToList: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	let message;
	try {
		message = await ctx.reply('⏳ Загрузка информации...');

		const { characterName, realmName } = await checkNameAndRealm(ctx);
		const info = await getCharacterInfo(characterName, realmName);

		await updateOrCreateOne(
			info.character.name,
			info.character.realm.name,
			info.current_mythic_rating.rating ?? 0,
		);

		await ctx.telegram.editMessageText(
			ctx.chat?.id,
			message.message_id,
			undefined,
			`✅ Готово!\nИнформация: персонаж добавлен`,
		);
	} catch (error) {
		await ctx.telegram.editMessageText(
			ctx.chat?.id,
			message?.message_id,
			undefined,
			`❌ Ошибка!\nИнформация: ${error}`,
		);
	} finally {
		return ctx.scene.leave(); // завершаем сцену
	}
};
