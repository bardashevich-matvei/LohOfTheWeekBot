export const COMMANDS = [
	{ command: 'persona', description: 'покажет текущий рио и лучший ключ в тайм' },
	{ command: 'all_characters', description: 'все персонажи в списке LohOfTheWeek' },
	{ command: 'delete_persona', description: 'удалить персонажа из списка LohOfTheWeek' },
	{
		command: 'upsert_persona',
		description: 'добавить/обновить инфу о персонаже в списке LohOfTheWeek',
	},
	{
		command: 'exit',
		description: 'выход',
	},
] as const;
