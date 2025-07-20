import { withCancel } from './scenesHelpers/helpers/exit';
import { addFullName } from './scenesHelpers/addName';
import { getCharacterRio } from './scenesHelpers/getCharacterRio';
import { saveName } from './scenesHelpers/saveName';
import { TimedWizardScene } from './scenesHelpers/helpers/TimesWizard';

export const characterWizard = new TimedWizardScene(
	'characterWizard',
	{ timeoutMs: 60 * 1000, timeoutMessage: 'Время ожидания истекло. Сцена завершена.' },
	...withCancel([addFullName, saveName, getCharacterRio]),
);
