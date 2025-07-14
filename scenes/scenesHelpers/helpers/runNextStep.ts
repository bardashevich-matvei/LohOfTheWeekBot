import { Scenes } from 'telegraf';

export async function runNextStep<C extends Scenes.WizardContext>(
	ctx: Scenes.WizardContext,
): Promise<void> {
	ctx.wizard.next(); // ⏭ переход к следующему шагу

	// Принудительно запустить текущий шаг
	const newCtx = ctx.wizard as any;
	const handler = newCtx?.step;

	if (handler) {
		await handler(ctx);
	}
}
