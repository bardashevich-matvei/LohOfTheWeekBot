export type CharacterRioInfoDto = {
	_links: {
		self: {
			href: string;
		};
	};
	current_period: { period: { key: [Object]; id: number } };
	seasons: [{ key: [Object]; id: number }, { key: [Object]; id: number }];
	character: {
		key: {
			href: string;
		};
		name: string;
		id: number;
		realm: { key: [Object]; name: string; id: number; slug: string };
	};
	current_mythic_rating: {
		color: { r: number; g: number; b: number; a: number };
		rating: number;
	};
};
