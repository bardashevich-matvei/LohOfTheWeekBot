import { MiddlewareFn } from 'telegraf';
import { deleteOne } from '../../repositories/character';
import { RioContext } from '../../types';
import { checkNameAndRealm } from '../../validation/basic';

export const deleteCharacterFromList: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	let message;
	try {
		message = await ctx.reply('⏳ Загрузка информации...');

		const { characterName, realmName } = await checkNameAndRealm(ctx);

		await deleteOne(characterName, realmName);

		await ctx.telegram.editMessageText(
			ctx.chat?.id,
			message.message_id,
			undefined,
			`✅ Готово!\nИнформация: персонаж удалён`,
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
