import { IOrderItem } from './orderItem.interface';

export interface IOrder {
	userId: string;
	items: IOrderItem[];
	totalAmount: number;
}
