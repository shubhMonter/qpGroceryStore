import { Request, Response } from 'express';
export interface IUserController {
	registerAdmin(req: Request, res: Response): void;
	registerCustomer(req: Request, res: Response): void;
	login(req: Request, res: Response): void;
	updateUser(req: Request, res: Response): void;
}
