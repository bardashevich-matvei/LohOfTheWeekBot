import { addFullName } from './scenesHelpers/addName';
import { withCancel } from './scenesHelpers/helpers/exit';
import { saveName } from './scenesHelpers/saveName';
import { upsertCharacterToList } from './scenesHelpers/upsertCharacterToList';
import { TimedWizardScene } from './scenesHelpers/helpers/TimesWizard';

export const upsertWizard = new TimedWizardScene(
	'upsertWizard',
	{ timeoutMs: 60 * 1000, timeoutMessage: 'Время ожидания истекло. Сцена завершена.' },
	...withCancel([addFullName, saveName, upsertCharacterToList]),
);
