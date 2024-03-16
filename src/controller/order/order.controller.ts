import { IOrder } from '../../models/interface/order.interface';
import { IItemsService } from '../../services/item/item.sevice.interface';
import { IOrdersService } from '../../services/order/order.service.interface';
import { IOrderItemsService } from '../../services/orderItem/orderItem.service.interface';
import { err500, ok200 } from '../../utils/response.util';
import { IOrderController } from './order.controller.interface';
import { Request, Response } from 'express';
class OrderController implements IOrderController {
	constructor(
		private readonly orderItemService: IOrderItemsService,
		private readonly orderService: IOrdersService,
		private readonly itemsService: IItemsService
	) {}
	getAll(req: Request, res: Response): void {
		throw new Error('Method not implemented.');
	}
	getorderById(req: Request, res: Response): void {
		throw new Error('Method not implemented.');
	}
	createOrder = async (req: Request, res: Response) => {
		try {
			let { userId, items, totalAmount } = req.body as unknown as IOrder;

			const newItem = await this.orderService.addOrder({
				userId,
				items,
				totalAmount,
			});
			const newItems = await Promise.all(
				items.map(async (item) => {
					const gItem = await this.itemsService.getById(item.groceryItemId);
					if (Number(gItem?.quantityAvailable) > item.quantity)
						this.itemsService.updateItem(item.groceryItemId, {
							quantityAvailable: Number(gItem?.quantityAvailable) - item.quantity,
						});
					//return this.orderItemService.addOrderItem({...item,order:});
				})
			);
			console.log(newItems);
			ok200(res, { ...newItem });
		} catch (error) {
			console.log(error);
			err500(res, { message: 'Something went wrong. Please Try again later!' });
		}
	};
	updateById(req: Request, res: Response): void {
		throw new Error('Method not implemented.');
	}
	deleteById(req: Request, res: Response): void {
		throw new Error('Method not implemented.');
	}
}
