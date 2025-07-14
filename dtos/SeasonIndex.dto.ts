export type SeasonIndexDto = {
	_links: {
		self: {
			href: string;
		};
	};
	seasons: [{ key: [Object]; id: number }, { key: [Object]; id: number }];
	current_season: {
		key: {
			href: string;
		};
		id: number;
	};
};
