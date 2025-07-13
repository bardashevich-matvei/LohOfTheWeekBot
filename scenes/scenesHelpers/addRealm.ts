import { MiddlewareFn } from 'telegraf';
import { RioContext } from '../../types';

export const addRealm: MiddlewareFn<RioContext> = async (ctx: RioContext) => {
	console.log('шаг 2');
	if (!ctx.message || !('text' in ctx.message)) {
		ctx.reply('Пожалуйста, введите текст.');
		return ctx.wizard.back();
	}

	if (ctx.session.__scenes) {
		ctx.session.__scenes.characterName = ctx.message.text;
		ctx.reply(`Имя персонажа сохранено: ${ctx.message.text}\nВведите название сервера:`);
		return ctx.wizard.next();
	} else {
		return ctx.scene.leave();
	}
};
