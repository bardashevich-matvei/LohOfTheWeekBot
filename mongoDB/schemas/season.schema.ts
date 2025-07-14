import mongoose, { Schema } from 'mongoose';

export interface ISeason {
	id: number;
}

const SeasonSchema = new Schema<ISeason>({
	id: { type: Number },
});

export const SeasonModel = mongoose.model<ISeason>('Season', SeasonSchema);
