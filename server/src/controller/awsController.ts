import { Request, Response, NextFunction } from 'express';
import { aws } from 'service/aws';

class AwsController {
	async getPresignedPostUrl(req: Request, res: Response, next: NextFunction) {
		try {
			const urlData = await aws.perSignedPostUrl(req.body.key);
			res.json({
				data: urlData,
				status: 201,
				message: 'successfully get perSignedPostUrl',
			});
		} catch (error) {
			next(error);
		}
	}

	async createEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const file: Express.Multer.File = req.file;
			const imageData = await aws.uploadImage({
				Bucket: process.env.BUCKET_NAME,
				body: file.buffer,
				ContentType: file.mimetype,
				key: file.originalname,
			});
			res.json(imageData);
		} catch (error) {
			next(error);
		}
	}
}

export const awsController = new AwsController();
