import { NextFunction, Request, Response } from 'express';
import { appLogger } from '../configs/logger.config';
import { verifyJWT } from '../utils/jwt.utils';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const authInterceptor = (req: Request, res: Response, next: NextFunction) => {
	appLogger.info('Intercepting: %s', req.url);
	const token: any = verifyJWT(req);
	if (token) {
		next(); // User is an admin, continue to the next middleware
	} else {
		return res.status(403).json({ error: 'Forbidden', message: 'You are not authorized to access this resource' });
	}
};
