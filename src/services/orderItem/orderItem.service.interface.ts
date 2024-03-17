import { UpdateResult } from 'typeorm';
import { IOrderItem } from '../../models/interface/orderItem.interface';
import OrderItem from '../../models/orderItem';

export interface IOrderItemsService {
	save(item: OrderItem): void;
	addOrderItem(item: IOrderItem): Promise<OrderItem>;
	getOrderItemById(itemId: string): Promise<IOrderItem | null>;
	getAllOrderItemsByOrderId(orderId: string): Promise<IOrderItem[]>;
	updateOrderItem(itemId: string, item: IOrderItem): Promise<UpdateResult>;
	deleteOrderItemById(itemId: string): Promise<UpdateResult>;
}
