import { Scenes } from 'telegraf';
import { RioContext } from '../types';
import { addName } from './scenesHelpers/addName';
import { addRealm } from './scenesHelpers/addRealm';
import { getCharacterRio } from './scenesHelpers/getCharacterRio';
import { saveName } from './scenesHelpers/saveName';
import { saveRealm } from './scenesHelpers/saveRealm';

export const characterWizard = new Scenes.WizardScene<RioContext>(
	'characterWizard',
	addName,
	saveName,
	addRealm,
	saveRealm,
	getCharacterRio,
);
