/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const ok200 = (res: Response, body: null | any = null, message?: string): Response<any, Record<string, any>> => {
	return response(res, 200, { status: 'success', data: body, message });
};
export const err400 = (res: Response, body: null | any = null): Response<any, Record<string, any>> => {
	return response(res, 400, { status: 'error', ...body });
};
export const err500 = (res: Response, body: null | any = null): Response<any, Record<string, any>> => {
	return response(res, 500, { status: 'error', ...body });
};

export const err401 = (res: Response, body: null | any = null): Response<any, Record<string, any>> => {
	return response(res, 401, { status: 'error', ...body });
};
export const err403 = (res: Response, body: null | any = null): Response<any, Record<string, any>> => {
	return response(res, 403, { status: 'error', ...body });
};

export const response = (
	res: Response,
	statusCode: number,
	body: null | any = null
): Response<any, Record<string, any>> => {
	if (body) {
		return res.status(statusCode).json(body);
	}
	return res.sendStatus(statusCode);
};
