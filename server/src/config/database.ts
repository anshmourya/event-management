import mongoose from 'mongoose';

const database = async () => {
	// eslint-disable-next-line no-useless-catch
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log('connextd to the database');
	} catch (error) {
		throw error;
	}
};

export default database;
