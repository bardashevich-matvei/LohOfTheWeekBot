export type MythicPlusInfoDto = {
	_links: {
		self: {
			href: string;
		};
	};
	season: {
		key: {
			href: string;
		};
		id: number;
	};
	best_runs: [
		{
			completed_timestamp: number;
			duration: number;
			keystone_level: number;
			keystone_affixes: [
				{
					key: {
						href: string;
					};
					name: string;
					id: number;
				},
			];
			members: any[];
			// members: [
			//   {
			// 	character: {
			// 	  name: Discotheque,
			// 	  id: 175879740,
			// 	  realm: {
			// 		key: {
			// 		  href: https://eu.api.blizzard.com/data/wow/realm/1379?namespace=dynamic-eu
			// 		},
			// 		id: 1379,
			// 		slug: zuljin
			// 	  }
			// 	},
			// 	specialization: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-specialization/256?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Discipline,
			// 	  id: 256
			// 	},
			// 	race: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-race/10?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Blood Elf,
			// 	  id: 10
			// 	},
			// 	equipped_item_level: 657
			//   },
			//   {
			// 	character: {
			// 	  name: Verdictrevzx,
			// 	  id: 173200086,
			// 	  realm: {
			// 		key: {
			// 		  href: https://eu.api.blizzard.com/data/wow/realm/566?namespace=dynamic-eu
			// 		},
			// 		id: 566,
			// 		slug: blackhand
			// 	  }
			// 	},
			// 	specialization: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-specialization/70?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Retribution,
			// 	  id: 70
			// 	},
			// 	race: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-race/1?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Human,
			// 	  id: 1
			// 	},
			// 	equipped_item_level: 660
			//   },
			//   {
			// 	character: {
			// 	  name: Alasis,
			// 	  id: 97495945,
			// 	  realm: {
			// 		key: {
			// 		  href: https://eu.api.blizzard.com/data/wow/realm/584?namespace=dynamic-eu
			// 		},
			// 		id: 584,
			// 		slug: frostmourne
			// 	  }
			// 	},
			// 	specialization: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-specialization/64?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Frost,
			// 	  id: 64
			// 	},
			// 	race: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-race/5?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Undead,
			// 	  id: 5
			// 	},
			// 	equipped_item_level: 655
			//   },
			//   {
			// 	character: {
			// 	  name: Sbegato,
			// 	  id: 218323863,
			// 	  realm: {
			// 		key: {
			// 		  href: https://eu.api.blizzard.com/data/wow/realm/549?namespace=dynamic-eu
			// 		},
			// 		id: 549,
			// 		slug: silvermoon
			// 	  }
			// 	},
			// 	specialization: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-specialization/261?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Subtlety,
			// 	  id: 261
			// 	},
			// 	race: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-race/4?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Night Elf,
			// 	  id: 4
			// 	},
			// 	equipped_item_level: 662
			//   },
			//   {
			// 	character: {
			// 	  name: Kolosanity,
			// 	  id: 220252633,
			// 	  realm: {
			// 		key: {
			// 		  href: https://eu.api.blizzard.com/data/wow/realm/549?namespace=dynamic-eu
			// 		},
			// 		id: 549,
			// 		slug: silvermoon
			// 	  }
			// 	},
			// 	specialization: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-specialization/581?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Vengeance,
			// 	  id: 581
			// 	},
			// 	race: {
			// 	  key: {
			// 		href: https://eu.api.blizzard.com/data/wow/playable-race/4?namespace=static-11.1.7_61131-eu
			// 	  },
			// 	  name: Night Elf,
			// 	  id: 4
			// 	},
			// 	equipped_item_level: 661
			//   }
			// ],
			dungeon: {
				key: {
					href: string;
				};
				name: string;
				id: number;
			};
			is_completed_within_time: boolean;
			mythic_rating: {
				color: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				rating: number;
			};
			map_rating: {
				color: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				rating: number;
			};
		},
	];
};
