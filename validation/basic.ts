import { RioContext } from '../types';

export async function checkNameAndRealm(
	ctx: RioContext,
): Promise<{ characterName: string; realmName: string }> {
	if (!ctx.message || !('text' in ctx.message)) {
		throw new Error('ошибка валидации');
	}

	if (ctx.session.__scenes?.characterName && ctx.session.__scenes?.realmName) {
		console.log(
			`Имя персонажа: ${ctx.session.__scenes?.characterName} Cервер: ${ctx.session.__scenes?.realmName}`,
		);
		return {
			characterName: ctx.session.__scenes.characterName,
			realmName: ctx.session.__scenes?.realmName,
		};
	} else {
		throw new Error('ошибка данных сессии');
	}
}

export function messageCheck(ctx: RioContext) {
	if (!ctx.message || !('text' in ctx.message)) {
		ctx.reply('Пожалуйста, введите текст.');
		return ctx.wizard.back();
	}
	throw new Error('ошибка валидации сообщения');
}
