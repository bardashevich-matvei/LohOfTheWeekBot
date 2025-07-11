import { Telegraf, Scenes, session } from 'telegraf';
import * as dotenv from 'dotenv';
import { characterWizard, MyContext } from './scenes/getCurrentRio';
import { connectDB } from './mongoDB/index';
import { getAllCharacters } from './requests/getAllCharacters';

dotenv.config();
connectDB();

// const characterScene = new Scenes.BaseScene<Scenes.SceneContext>('characterScene');

// characterScene.enter((ctx) => {
//	 ctx.reply('Введите имя персонажа:');
// });

// characterScene.on('text', async (ctx) => {
//	 const characterName = ctx.message.text;
//	 ctx.reply(`Вы ввели: ${characterName}`);

//	 const info = await getCharacterInfo('silvermoon', `${characterName}`);
//	 ctx.reply(`${info}`);

//	 await ctx.scene.leave();
// });

// const stage = new Scenes.Stage<Scenes.SceneContext>([characterScene]);
const stage = new Scenes.Stage<MyContext>([characterWizard]);

const bot = new Telegraf<MyContext>(process.env.TOKEN!);

bot.use(session());
bot.use(stage.middleware());

bot.command('persona', (ctx) => ctx.scene.enter('characterWizard'));
bot.command('all_characters', async (ctx) => {
	const characters = await getAllCharacters();
	if (!characters.length) {
		ctx.reply('Пользователей пока нет 🙁');
		return;
	}

	const text = characters
		.map((character) => `${character.realm}-${character.username} (rio: ${character.rio})`)
		.join('\n');
	ctx.reply(`📋 Список пользователей:\n\n${text}`);
});

bot.on('text', async (ctx, next) => {
	if (ctx.message.text.startsWith('/') || ctx.scene?.current) return next();
	ctx.reply('Try /persona');
});

bot.launch();

bot.telegram.setMyCommands([
	{ command: 'persona', description: 'WoW' },
	{ command: 'all_characters', description: 'all characters' },
]);

console.log('Бот запущен');
