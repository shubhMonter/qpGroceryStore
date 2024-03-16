import { Request, Response } from 'express';

export interface IItemsController {
	getAll(req: Request, res: Response): void;
	getById(req: Request, res: Response): void;
	addItem(req: Request, res: Response): void;
	updateById(req: Request, res: Response): void;
	deleteById(req: Request, res: Response): void;
}
