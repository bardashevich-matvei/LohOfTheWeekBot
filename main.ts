import { Telegraf } from 'telegraf';
import { getCharacterInfo } from './getCharacterInfo';
const bot = new Telegraf(process.env.TOKEN!);

bot.start((ctx) => ctx.reply('Привет! Я бот на TypeScript'));
bot.on('text', async (ctx) => {
    const info = await getCharacterInfo('silvermoon', `${ctx.message.text}`);
    ctx.reply(`${info}`);
}
);

bot.launch();

console.log('Бот запущен');
