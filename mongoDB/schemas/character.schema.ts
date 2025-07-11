import mongoose, { Schema } from 'mongoose';

export interface ICharacter {
	username: string;
	realm: string;
	rio: number;
}

const CharacterSchema = new Schema<ICharacter>({
	username: { type: String },
	realm: { type: String },
	rio: { type: Number, default: 0 },
});

export const CharacterModel = mongoose.model<ICharacter>('Character', CharacterSchema);
