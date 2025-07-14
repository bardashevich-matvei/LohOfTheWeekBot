import { Scenes } from 'telegraf';
import { RioContext } from '../types';
import { addName } from './scenesHelpers/addName';
import { addRealm } from './scenesHelpers/addRealm';
import { deleteCharacterFromList } from './scenesHelpers/deleteCharacterFromList';
import { saveName } from './scenesHelpers/saveName';
import { saveRealm } from './scenesHelpers/saveRealm';

export const deleteWizard = new Scenes.WizardScene<RioContext>(
	'deleteWizard',
	addName,
	saveName,
	addRealm,
	saveRealm,
	deleteCharacterFromList,
);
