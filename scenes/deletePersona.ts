import { Scenes } from 'telegraf';
import { RioContext } from '../types';
import { addName } from './scenesHelpers/addName';
import { addRealm } from './scenesHelpers/addRealm';
import { deleteCharacterFromList } from './scenesHelpers/deleteCharacterFromList';

export const deleteWizard = new Scenes.WizardScene<RioContext>(
	'deleteWizard',
	addName,
	addRealm,
	deleteCharacterFromList,
);
