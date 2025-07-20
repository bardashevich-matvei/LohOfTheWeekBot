import { MiddlewareFn } from 'telegraf';
import { RioContext } from '../../types';

export const addFullName: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	console.log('addname');
	await ctx.reply('Введите имя персонажа: \nПример: Gordunni-Нагибатор');
	return ctx.wizard.next();
};
