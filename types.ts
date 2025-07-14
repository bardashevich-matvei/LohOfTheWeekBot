import { Scenes, Context } from 'telegraf';
import { WizardSessionData } from 'telegraf/typings/scenes';

export interface ISessionRio extends WizardSessionData {
	characterName?: string;
	realmName?: string;
}

export type RioContext = Context & Scenes.WizardContext<ISessionRio>;
