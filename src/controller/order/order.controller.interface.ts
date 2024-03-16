import { Request, Response } from 'express';
export interface IOrderController {
	getAll(req: Request, res: Response): void;
	getorderById(req: Request, res: Response): void;
	createOrder(req: Request, res: Response): void;
	updateById(req: Request, res: Response): void;
	deleteById(req: Request, res: Response): void;
}
