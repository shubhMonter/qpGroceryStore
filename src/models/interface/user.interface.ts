import { Role } from '../constants';

export interface IUser {
	userId: string;
	password?: string;
	role: Role;
}
