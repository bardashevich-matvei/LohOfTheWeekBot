import { Scenes } from 'telegraf';
import { RioContext } from '../types';
import { addName } from './scenesHelpers/addName';
import { addRealm } from './scenesHelpers/addRealm';
import { saveName } from './scenesHelpers/saveName';
import { saveRealm } from './scenesHelpers/saveRealm';
import { upsertCharacterToList } from './scenesHelpers/upsertCharacterToList';

export const upsertWizard = new Scenes.WizardScene<RioContext>(
	'upsertWizard',
	addName,
	saveName,
	addRealm,
	saveRealm,
	upsertCharacterToList,
);
