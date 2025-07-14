import { ISeason, SeasonModel } from '../mongoDB/schemas/season.schema';

export async function addSeason(id: number) {
	return SeasonModel.create({ id });
}

export async function findOneSeasonById(id: number) {
	return SeasonModel.findOne({ id }).lean();
}

export async function findLastSeason() {
	return SeasonModel.findOne().sort({ id: -1 }).lean();
}
