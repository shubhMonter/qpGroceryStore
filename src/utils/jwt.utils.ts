import jwt from 'jsonwebtoken';
import { Request } from 'express';

const APP_KEY_JWT = process.env.APP_KEY_JWT;

export const signJWT = (data: object, expires: number = 1): string => {
	return jwt.sign(data, `${APP_KEY_JWT}`, {
		expiresIn: expires + 'h',
	});
};

export const verifyJWT = (req: Request) => {
	if (req.headers.authorization) {
		let token = req.headers.authorization.split(' ')[1];
		return jwt.verify(token, `${APP_KEY_JWT}`);
	}
	return false;
};

export const verifyToken = (token: string): boolean => {
	try {
		let decoded = jwt.verify(token, `${APP_KEY_JWT}`);
		return decoded ? true : false;
	} catch (error) {
		return false;
	}
};
