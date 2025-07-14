import { Telegraf, Scenes, session } from 'telegraf';
import * as dotenv from 'dotenv';
import { connectDB } from './mongoDB/index';
import { getAllCharacters } from './requests/getAllCharacters';
import { RioContext } from './types';
import { characterWizard } from './scenes/getCurrentRio';
import { upsertWizard } from './scenes/upsertPersona';
import { deleteWizard } from './scenes/deletePersona';
import cron from 'node-cron';
import { getCurrentSeasonIndex } from './requests/getCurrentSeasonInfo';
import { addSeason, findOneSeasonById } from './repositories/season';

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
const stage = new Scenes.Stage<RioContext>([characterWizard, deleteWizard, upsertWizard]);

const bot = new Telegraf<RioContext>(process.env.TOKEN!);

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
bot.command('delete_persona', (ctx) => ctx.scene.enter('deleteWizard'));
bot.command('upsert_persona', (ctx) => ctx.scene.enter('upsertWizard'));

bot.on('text', async (ctx, next) => {
	if (ctx.message.text.startsWith('/') || ctx.scene?.current) return next();
	ctx.reply('Try any command');
});

bot.launch();

bot.telegram.setMyCommands([
	{ command: 'persona', description: 'покажет текущий рио и лучший ключ в тайм' },
	{ command: 'all_characters', description: 'все персонажи в списке LohOfTheWeek' },
	{ command: 'delete_persona', description: 'удалить персонажа из списка LohOfTheWeek' },
	{
		command: 'upsert_persona',
		description: 'добавить/обновить инфу о персонаже в списке LohOfTheWeek',
	},
]);

console.log('Бот запущен');

// Запускается каждый день в 7:01
cron.schedule('1 7 * * *', async () => {
	console.log('Выполняем задачу в 12:00 каждый день');
	const seasonId = await getCurrentSeasonIndex();
	const oldId = await findOneSeasonById(seasonId);
	if (!oldId) {
		console.log('новый сезон начался');
		await addSeason(seasonId);
	}
});
