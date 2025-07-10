import { Telegraf, Scenes, session, Context } from 'telegraf';
import { getCharacterInfo } from './getCharacterInfo';
import * as dotenv from 'dotenv';
import { WizardSessionData } from 'telegraf/typings/scenes';
import * as uuid from 'uuid';
dotenv.config();

interface MySession extends WizardSessionData {
    characterName?: string;
    realmName?: string;
}

const characterScene = new Scenes.BaseScene<Scenes.SceneContext>('characterScene');

type MyContext = Context & Scenes.WizardContext<MySession>;
const characterWizard = new Scenes.WizardScene<MyContext>(
    'characterWizard',

    async (ctx) => {
        ctx.reply('Введите имя персонажа:');
        return ctx.wizard.next();
    },

    async (ctx, next) => {
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
        if (ctx.session.__scenes) {
            ctx.session.__scenes.realmName = ctx.message.text;
            const characterName = ctx.session.__scenes.characterName;
            const realmName = ctx.session.__scenes.realmName;
            ctx.reply(`Имя персонажа сохранено: ${characterName}\nCервер сохранён: ${realmName}`);
            const message = await ctx.reply('⏳ Загрузка информации...');
            const info = await getCharacterInfo(realmName, `${characterName}`);
            await ctx.telegram.editMessageText(
                ctx.chat?.id,
                message.message_id,
                undefined,
                `✅ Готово!\nИнформация: ${info}`
            );

        } else {
            ctx.reply(`ошибка! персонаж не найден!`);
        }
        return ctx.scene.leave(); // завершаем сцену
      }
)

characterScene.enter((ctx) => {
    ctx.reply('Введите имя персонажа:');
});

characterScene.on('text', async (ctx) => {
    const characterName = ctx.message.text;
    ctx.reply(`Вы ввели: ${characterName}`);

    const info = await getCharacterInfo('silvermoon', `${characterName}`);
    ctx.reply(`${info}`);

    await ctx.scene.leave();
});

// const stage = new Scenes.Stage<Scenes.SceneContext>([characterScene]);
const stage = new Scenes.Stage<MyContext>([characterWizard]);

const bot = new Telegraf<MyContext>(process.env.TOKEN!);

bot.use(session());
bot.use(stage.middleware());

bot.command('persona', (ctx) => ctx.scene.enter('characterWizard'));

 
bot.on('text', async (ctx, next) => {
    if (ctx.message.text.startsWith('/') || ctx.scene?.current) return next();
    ctx.reply("Try /persona");
});

bot.launch();

bot.telegram.setMyCommands([
    { command: 'persona', description: 'WoW' },
]);

console.log('Бот запущен');
