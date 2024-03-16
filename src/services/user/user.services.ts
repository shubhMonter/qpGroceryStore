import { UpdateResult } from 'typeorm';
import database from '../../database/database';
import { Users } from '../../models/user';
import { IUserService } from './user.service.interface';
import { IUser } from '../../models/interface/user.interface';

class UserService implements IUserService {
	userRepo = database.getRepository(Users);
	async createUser(user: IUser): Promise<Users> {
		return new Promise(async (res, rej) => {
			try {
				const createuser = this.userRepo.create(user);
				await this.userRepo.save(createuser);
				res(createuser);
			} catch (error) {
				rej(error);
			}
		});
	}
	async getUser(userId: string): Promise<Users | null> {
		return await this.userRepo.findOneByOrFail({ userId });
	}
	async updateUser(userId: string, user: IUser): Promise<UpdateResult> {
		return await this.userRepo.update(userId, user);
	}
	async delete(userId: string): Promise<UpdateResult> {
		return await this.userRepo.softDelete(userId);
	}
}

export default UserService;
