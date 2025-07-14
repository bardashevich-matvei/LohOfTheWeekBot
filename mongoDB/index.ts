import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		const user = process.env.DB_USER!;
		const password = process.env.DB_PASSWORD!;
		const uri = `mongodb+srv://${user}:${password}@cluster0.dcz8yjz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

		await mongoose.connect(uri, {
			dbName: 'lohoftheweek',
		});
		console.log('MongoDB connected');
	} catch (err) {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	}
};
