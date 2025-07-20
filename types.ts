import { Scenes, Context } from 'telegraf';
import { WizardSessionData } from 'telegraf/typings/scenes';

export interface TimedWizardOptions {
	timeoutMs: number;
	timeoutMessage: string;
}

export interface ISessionRio extends WizardSessionData {
	characterName?: string;
	realmName?: string;
	inactivityTimeout?: NodeJS.Timeout;
}

export type RioContext = Context & Scenes.WizardContext<ISessionRio>;
