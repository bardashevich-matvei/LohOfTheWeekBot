import { MiddlewareFn, Scenes } from 'telegraf';

export function withCancel<T extends Scenes.WizardContext>(
	steps: MiddlewareFn<T>[],
): MiddlewareFn<T>[] {
	const cancelHandler: MiddlewareFn<T> = async (ctx, next) => {
		if (ctx.message && 'text' in ctx.message && ctx.message.text === '/exit') {
			await ctx.reply('❌ Операция отменена.');
			await ctx.scene.leave();
			return;
		}
		return next();
	};

	return steps.map((step) => {
		return async (ctx, next) => {
			await cancelHandler(ctx, async () => step(ctx, next) as void);
		};
	});
}
