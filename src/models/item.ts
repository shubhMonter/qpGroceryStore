import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IItems } from './interface/item.interface';

@Entity('Items')
export class Items implements IItems {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ type: 'varchar', unique: true, nullable: false })
	name: string;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	description: string;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	unit: string;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	unitPrice: number;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	quantityAvailable: number;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
