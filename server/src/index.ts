import 'dotenv/config';
import express from 'express';
import router from '@routes/index';
import database from '@config/database';
const app = express();
const port = 3000;

app.use('/api/v1', router);

database()
	.then(() =>
		app.listen(port, () => {
			return console.log(`Express is listening at http://localhost:${port}`);
		})
	)
	.catch((error) => {
		console.error(error);
	});
