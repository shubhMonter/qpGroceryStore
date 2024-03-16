import { Request, Response } from 'express';
import { IItemsController } from './item.controller.interface';
import { IItemsService } from '../../services/item/item.sevice.interface';
import { IItems } from '../../models/interface/item.interface';
import { err400, err500, ok200 } from '../../utils/response.util';

class ItemsController implements IItemsController {
	constructor(private readonly itemService: IItemsService) {}
	addItem = async (req: Request, res: Response) => {
		try {
			const { name, description, unit, unitPrice, quantityAvailable } = req.body as IItems;
			const newItem = await this.itemService.addItem({
				name,
				description,
				unit,
				unitPrice,
				quantityAvailable,
			});
			ok200(res, { ...newItem });
		} catch (error) {
			console.log(error);
			err500(res, { message: 'Something went wrong. Please Try again later!' });
		}
	};
	getAll = async (req: Request, res: Response) => {
		try {
			const newItem = await this.itemService.getAllItems();
			ok200(res, [...newItem]);
		} catch (error) {
			console.log(error);
			err500(res, { message: 'Something went wrong. Please Try again later!' });
		}
	};
	getById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const newItem = await this.itemService.getById(id);
			if (newItem) ok200(res, { ...newItem });
			else err400(res, { message: 'Item Not Found!' });
		} catch (error) {
			console.log(error);
			err500(res, { message: 'Something went wrong. Please Try again later!' });
		}
	};
	updateById = async (req: Request, res: Response) => {
		try {
			const { name, description, unit, unitPrice, quantityAvailable } = req.body as IItems;
			const { id } = req.params;
			const item = await this.itemService.getById(id);
			if (item) {
				const updatedItem = await this.itemService.updateItem(id, {
					name,
					description,
					unit,
					unitPrice,
					quantityAvailable: item.quantityAvailable + quantityAvailable, //adding prev qty and new qty
				});
				ok200(res, { ...updatedItem });
			} else err400(res, { message: 'Item Not Found!' });
		} catch (error) {
			console.log(error);
			err500(res, { message: 'Something went wrong. Please Try again later!' });
		}
	};
	deleteById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const item = await this.itemService.getById(id);
			if (item) {
				const updatedItem = await this.itemService.deleteItemById(id);
				ok200(res, { ...updatedItem }, 'Item deleted Succesfully!');
			} else err400(res, { message: 'Item Not Found!' });
		} catch (error) {
			console.log(error);
			err500(res, { message: 'Something went wrong. Please Try again later!' });
		}
	};
}

export default ItemsController;
