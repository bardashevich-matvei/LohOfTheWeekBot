import { Scenes, Context } from 'telegraf';
import { WizardSessionData } from 'telegraf/typings/scenes';
import { getCharacterInfo } from '../requests/getCharacterInfo';

export interface MySession extends WizardSessionData {
	characterName?: string;
	realmName?: string;
}
export type MyContext = Context & Scenes.WizardContext<MySession>;

export const characterWizard = new Scenes.WizardScene<MyContext>(
	'characterWizard',

	async (ctx) => {
		ctx.reply('Введите имя персонажа:');
		return ctx.wizard.next();
	},

	async (ctx) => {
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
	},

	async (ctx) => {
		if (!ctx.message || !('text' in ctx.message)) {
			ctx.reply('Пожалуйста, введите текст.');
			return ctx.wizard.back();
		}

		let message;
		try {
			if (ctx.session.__scenes) {
				ctx.session.__scenes.realmName = ctx.message.text;
				const characterName = ctx.session.__scenes.characterName;
				const realmName = ctx.session.__scenes.realmName;
				ctx.reply(
					`Имя персонажа сохранено: ${characterName}\nCервер сохранён: ${realmName}`,
				);
				console.log(`Имя персонажа: ${characterName} Cервер: ${realmName}`);
				message = await ctx.reply('⏳ Загрузка информации...');
				const info = await getCharacterInfo(realmName, `${characterName}`);
				await ctx.telegram.editMessageText(
					ctx.chat?.id,
					message.message_id,
					undefined,
					`✅ Готово!\nИнформация: ${info}`,
				);
			} else {
			}
			return ctx.scene.leave(); // завершаем сцену
		} catch (error) {
			if (ctx.chat?.id) {
				await ctx.telegram.editMessageText(
					ctx.chat?.id,
					message?.message_id,
					undefined,
					`❌ Ошибка!\nИнформация: ${error}`,
				);
			}
			ctx.reply(`ошибка! персонаж не найден!`);
			return ctx.scene.leave(); // завершаем сцену
		}
	},
);
