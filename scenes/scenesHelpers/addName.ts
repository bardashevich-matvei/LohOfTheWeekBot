import { MiddlewareFn } from 'telegraf';
import { RioContext } from '../../types';

export const addName: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	ctx.reply('Введите имя персонажа:');
	return ctx.wizard.next();
};
