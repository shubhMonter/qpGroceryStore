import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Orders } from './order';

@Entity('OrderItems')
class OrderItem {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('uuid')
	groceryItemId: string;

	@Column('int')
	quantity: number;

	@ManyToOne(() => Orders, (order) => order.items)
	order: Orders;
}

export default OrderItem;
