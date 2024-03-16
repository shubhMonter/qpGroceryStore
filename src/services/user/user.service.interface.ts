import { UpdateResult } from 'typeorm';
import { Role } from '../../models/constants';
import { Users } from '../../models/user';
import { IUser } from '../../models/interface/user.interface';

export interface IUserService {
	createUser(user: IUser): Promise<Users>;
	getUser(userId: string): Promise<Users | null>;
	updateUser(userId: string, user: IUser): Promise<UpdateResult>;
	delete(userId: string): Promise<any>;
}
