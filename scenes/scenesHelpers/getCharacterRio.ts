import { MiddlewareFn } from 'telegraf';
import { getCharacterInfo } from '../../requests/getCharacterInfo';
import { RioContext } from '../../types';
import { checkNameAndRealm } from '../../validation/basic';

export const getCharacterRio: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	let message;
	try {
		message = await ctx.reply('⏳ Загрузка информации...');

		const { characterName, realmName } = await checkNameAndRealm(ctx);
		const info = await getCharacterInfo(realmName, characterName);

		const rio = info.current_mythic_rating.rating ?? 0;

		await ctx.telegram.editMessageText(
			ctx.chat?.id,
			message.message_id,
			undefined,
			`✅ Готово!\nИнформация: ${rio}`,
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
