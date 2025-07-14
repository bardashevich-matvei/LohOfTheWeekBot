import { MiddlewareFn } from 'telegraf';
import { RioContext } from '../../types';
import { runNextStep } from './helpers/runNextStep';

export const saveName: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	console.log('savename');
	if (!ctx.message || !('text' in ctx.message) || !ctx.session.__scenes) {
		ctx.reply('Пожалуйста, введите текст.');
		return ctx.wizard.back();
	} else {
		ctx.session.__scenes.characterName = ctx.message.text;
		await ctx.reply(`Имя персонажа сохранено: ${ctx.message.text}`);
		await runNextStep(ctx);
	}
};
