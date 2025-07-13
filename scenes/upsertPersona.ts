import { Scenes } from 'telegraf';
import { RioContext } from '../types';
import { addName } from './scenesHelpers/addName';
import { addRealm } from './scenesHelpers/addRealm';
import { upsertCharacterToList } from './scenesHelpers/upsertCharacterToList';

export const upsertWizard = new Scenes.WizardScene<RioContext>(
	'upsertWizard',
	addName,
	addRealm,
	upsertCharacterToList,
);
