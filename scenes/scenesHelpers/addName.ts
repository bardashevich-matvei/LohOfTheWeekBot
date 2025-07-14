import { MiddlewareFn } from 'telegraf';
import { RioContext } from '../../types';

export const addName: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	console.log('addname');
	await ctx.reply('Введите имя персонажа:');
	return ctx.wizard.next();
};
