import { addFullName } from './scenesHelpers/addName';
import { deleteCharacterFromList } from './scenesHelpers/deleteCharacterFromList';
import { withCancel } from './scenesHelpers/helpers/exit';
import { saveName } from './scenesHelpers/saveName';
import { TimedWizardScene } from './scenesHelpers/helpers/TimesWizard';

export const deleteWizard = new TimedWizardScene(
	'deleteWizard',
	{ timeoutMs: 60 * 1000, timeoutMessage: 'Время ожидания истекло. Сцена завершена.' },
	...withCancel([addFullName, saveName, deleteCharacterFromList]),
);
