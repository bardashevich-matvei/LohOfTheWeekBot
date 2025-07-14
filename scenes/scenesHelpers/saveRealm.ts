import { MiddlewareFn } from 'telegraf';
import { RioContext } from '../../types';
import { runNextStep } from './helpers/runNextStep';

export const saveRealm: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	console.log('saverealm');
	if (!ctx.message || !('text' in ctx.message) || !ctx.session.__scenes) {
		ctx.reply('Пожалуйста, введите текст.');
		return ctx.wizard.back();
	} else {
		ctx.session.__scenes.realmName = ctx.message.text;
		await ctx.reply(`Имя сервера сохранено: ${ctx.message.text}`);
		await runNextStep(ctx);
	}
};
