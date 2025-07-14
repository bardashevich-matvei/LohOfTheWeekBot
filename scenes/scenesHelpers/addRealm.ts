import { MiddlewareFn } from 'telegraf';
import { RioContext } from '../../types';

export const addRealm: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	console.log('addrealm');
	await ctx.reply('Введите имя сервера:');
	return ctx.wizard.next();
};
