import { UpdateResult } from 'typeorm';
import { IOrder } from '../../models/interface/order.interface';
import { Orders } from '../../models/order';

export interface IOrdersService {
	addOrder(item: IOrder): Promise<Orders>;
	getOrderById(Id: string): Promise<IOrder | null>;
	updateOrder(Id: string, order: IOrder): Promise<UpdateResult>;
	deleteOrderById(Id: string): Promise<UpdateResult>;
}
