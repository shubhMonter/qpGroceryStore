import { UpdateResult } from 'typeorm';
import { IOrder } from '../../models/interface/order.interface';
import { Orders } from '../../models/order';
import { IOrdersService } from './order.service.interface';
import database from '../../database/database';

class OrdersService implements IOrdersService {
	orderRepo = database.getRepository(Orders);
	addOrder = async (item: IOrder): Promise<Orders> => {
		return new Promise(async (res, rej) => {
			try {
				const newOrder = this.orderRepo.create(item);
				await this.orderRepo.save(newOrder);
				res(newOrder);
			} catch (error) {
				rej(error);
			}
		});
	};
	getOrderById = async (orderId: string): Promise<Orders | null> => {
		return await this.orderRepo.findOne({
			where: { id: orderId },
			relations: ['items'],
			// select: ['userId'],
		});
	};

	updateOrder(Id: string, order: IOrder): Promise<UpdateResult> {
		throw new Error('Method not implemented.');
	}
	deleteOrderById(Id: string): Promise<UpdateResult> {
		throw new Error('Method not implemented.');
	}
}

export default OrdersService;
