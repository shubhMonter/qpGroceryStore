import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { IOrder } from './interface/order.interface';
import { Users } from './user';
import OrderItem from './orderItem';

@Entity('Orders')
export class Orders implements IOrder {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ManyToOne(() => Users, (user: Users) => user.id)
	@JoinColumn()
	userId: string;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: ['insert', 'update'] })
	@JoinColumn()
	items: OrderItem[];

	@Column('decimal', { precision: 10, scale: 2 })
	totalAmount: number;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
