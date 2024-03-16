import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from './constants';
import { IUser } from './interface/user.interface';

@Entity('Users')
export class Users implements IUser {
	@PrimaryGeneratedColumn('uuid')
	id?: number;

	@Column({ type: 'varchar', unique: true, nullable: false })
	userId: string;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	password?: string;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	role: Role;
}
