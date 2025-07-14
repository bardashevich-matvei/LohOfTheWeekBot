import { MiddlewareFn } from 'telegraf';
import { deleteOne } from '../../repositories/character';
import { RioContext } from '../../types';
import { checkNameAndRealm } from '../../validation/basic';

export const deleteCharacterFromList: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	let message;
	try {
		message = await ctx.reply('⏳ Загрузка информации...');

		const { characterName, realmName } = await checkNameAndRealm(ctx);

		const res = await deleteOne(realmName, characterName);

		if (res.deletedCount === 0) {
			await ctx.telegram.editMessageText(
				ctx.chat?.id,
				message.message_id,
				undefined,
				`❌ К сожалению, такого персонажа нет в списке`,
			);
		} else {
			await ctx.telegram.editMessageText(
				ctx.chat?.id,
				message.message_id,
				undefined,
				`✅ Готово!\nИнформация: персонаж удалён`,
			);
		}
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
