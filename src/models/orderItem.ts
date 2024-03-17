import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
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
	@JoinColumn()
	order: Orders;
}

export default OrderItem;
