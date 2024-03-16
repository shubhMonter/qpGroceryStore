import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt.utils';
import { Role } from '../models/constants';

class RoleMiddleware {
	static isAdmin(req: Request, res: Response, next: NextFunction) {
		// Assuming you have a way to determine the user role, such as from JWT or session
		const token: any = verifyJWT(req);
		if (token.role === Role.ADMIN) {
			next(); // User is an admin, continue to the next middleware
		} else {
			return res
				.status(403)
				.json({ error: 'Forbidden', message: 'You are not authorized to access this resource' });
		}
	}
	static isCustomer(req: Request, res: Response, next: NextFunction) {
		// Assuming you have a way to determine the user role, such as from JWT or session
		const token: any = verifyJWT(req);
		if (token.role === Role.ADMIN) {
			next(); // User is an admin, continue to the next middleware
		} else {
			return res
				.status(403)
				.json({ error: 'Forbidden', message: 'You are not authorized to access this resource' });
		}
	}
}

export default RoleMiddleware;
