import { Scenes, MiddlewareFn } from 'telegraf';
import { RioContext, TimedWizardOptions } from '../../../types';

export class TimedWizardScene extends Scenes.WizardScene<RioContext> {
	private timeoutMs: number;
	private timeoutMessage: string;

	constructor(
		sceneId: string,
		options: TimedWizardOptions,
		...steps: MiddlewareFn<RioContext>[]
	) {
		// Оборачиваем шаги, чтобы сбрасывать таймер на каждом
		const wrappedSteps = steps.map((step) => {
			return async (ctx: RioContext, next: () => Promise<void>) => {
				this.resetTimer(ctx);
				return step(ctx, next);
			};
		});

		super(sceneId, ...wrappedSteps);

		this.timeoutMs = options.timeoutMs;
		this.timeoutMessage = options.timeoutMessage;
	}

	// При входе в сцену — сброс таймера
	enterMiddleware() {
		const originalEnter = super.enterMiddleware();
		return async (ctx: RioContext, next: () => Promise<void>) => {
			this.resetTimer(ctx);
			return originalEnter(ctx, next);
		};
	}

	// При выходе — очистка таймера
	leaveMiddleware() {
		const originalLeave = super.leaveMiddleware();
		return async (ctx: RioContext, next: () => Promise<void>) => {
			this.clearTimer(ctx);
			return originalLeave(ctx, next);
		};
	}

	private resetTimer(ctx: RioContext) {
		this.clearTimer(ctx);

		if (ctx.session.__scenes) {
			ctx.session.__scenes.inactivityTimeout = setTimeout(async () => {
				try {
					await ctx.reply(this.timeoutMessage);
					console.log('exit');
					await ctx.scene.leave();
				} catch (e) {
					console.error('Ошибка при авто-выходе из сцены:', e);
				}
			}, this.timeoutMs);
		}
	}

	private clearTimer(ctx: RioContext) {
		if (ctx.session.__scenes?.inactivityTimeout) {
			clearTimeout(ctx.session.__scenes.inactivityTimeout);
			ctx.session.__scenes.inactivityTimeout = undefined;
		}
	}
}
