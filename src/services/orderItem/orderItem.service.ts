import { UpdateResult } from 'typeorm';
import { IOrderItem } from '../../models/interface/orderItem.interface';
import OrderItem from '../../models/orderItem';
import { IOrderItemsService } from './orderItem.service.interface';
import database from '../../database/database';

class OrderItemService implements IOrderItemsService {
	itemRepo = database.getRepository(OrderItem);
	getAllOrderItemsByOrderId = async (orderId: string): Promise<OrderItem[]> => {
		return await this.itemRepo.findBy({
			order: {
				id: orderId,
			},
		});
	};
	addOrderItem = async (item: IOrderItem): Promise<OrderItem> => {
		return new Promise(async (res, rej) => {
			try {
				const newOrderItem = this.itemRepo.create(item);
				await this.itemRepo.save(newOrderItem);
				res(newOrderItem);
			} catch (error) {
				rej(error);
			}
		});
	};
	getOrderItemById = async (itemId: string): Promise<OrderItem | null> => {
		return await this.itemRepo.findOneBy({ id: itemId });
	};

	updateOrderItem(itemId: string, item: IOrderItem): Promise<UpdateResult> {
		throw new Error('Method not implemented.');
	}
	deleteOrderItemById(itemId: string): Promise<UpdateResult> {
		throw new Error('Method not implemented.');
	}
}

export default OrderItemService;
