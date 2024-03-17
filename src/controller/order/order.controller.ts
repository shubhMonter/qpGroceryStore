import { IOrder } from '../../models/interface/order.interface';
import OrderItem from '../../models/orderItem';
import { IItemsService } from '../../services/item/item.sevice.interface';
import { IOrdersService } from '../../services/order/order.service.interface';
import { IOrderItemsService } from '../../services/orderItem/orderItem.service.interface';
import { err400, err500, ok200 } from '../../utils/response.util';
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
	getorderById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const newItem = await this.orderService.getOrderById(id);
			if (newItem) ok200(res, { ...newItem });
			else err400(res, { message: 'Item Not Found!' });
		} catch (error) {
			console.log(error);
			err500(res, { message: 'Something went wrong. Please Try again later!' });
		}
	};
	createOrder = async (req: Request, res: Response) => {
		try {
			let { userId, items } = req.body as unknown as IOrder;
			let totalAmount = 0;

			const newItems: OrderItem[] = await Promise.all(
				items.map(async (item) => {
					const gItem = await this.itemsService.getById(item.groceryItemId);
					totalAmount = Number(totalAmount) + Number(gItem?.unitPrice) * Number(item.quantity);

					if (Number(gItem?.quantityAvailable) > Number(item.quantity))
						this.itemsService.updateItem(item.groceryItemId, {
							quantityAvailable: Number(gItem?.quantityAvailable) - Number(item.quantity),
						});
					//return this.orderItemService.addOrderItem({ ...item });
					let orderItem = new OrderItem();

					orderItem.groceryItemId = item.groceryItemId;
					orderItem.quantity = item.quantity;
					return orderItem;
				})
			);
			const newItem = await this.orderService.addOrder({
				userId,
				items: newItems,
				totalAmount,
			});

			// newItems.map(async (item) => {
			// 	// const gItem = await this.itemsService.getById(item.groceryItemId);
			// 	// 		if(gItem)
			// 	// return this.orderItemService.updateOrderItem(gItem.id as string,{ ...gItem, newItems.id });
			// 	item.order = newItem;
			// 	this.orderItemService.save(item);
			// });

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

export default OrderController;
