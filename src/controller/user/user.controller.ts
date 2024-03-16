import { Role } from '../../models/constants';
import { IUserService } from '../../services/user/user.service.interface';
import { err400, err403, err500, ok200 } from '../../utils/response.util';
import { IUserController } from './user.controller.interface';
import { Request, Response } from 'express';
import { encryptTo, matchEncryptTo } from '../../utils/encrypt.utils';
import { signJWT } from '../../utils/jwt.utils';
import { IUser } from '../../models/interface/user.interface';

class UserController implements IUserController {
	constructor(private readonly userService: IUserService) {}

	registerAdmin = async (req: Request, res: Response) => {
		try {
			let { userId, password } = req.body as unknown as IUser;
			const userExist = await this.userService.getUser(userId as string);
			if (!userExist) {
				password = await encryptTo(password as string);
				const user = await this.userService.createUser({
					userId,
					password,
					role: Role.ADMIN,
				});
				delete user.password;
				delete user.id;
				ok200(res, { ...user });
			} else {
				err400(res, { message: 'User Already Exist.Please Try Again!' });
			}
		} catch (error) {
			console.log(error);
			err500(res, { message: 'Something went wrong. Please Try again later!' });
		}
	};
	registerCustomer = async (req: Request, res: Response) => {
		try {
			let { userId, password } = req.body as unknown as IUser;
			const userExist = await this.userService.getUser(userId as string);

			if (!userExist) {
				password = await encryptTo(password as string);
				const user = await this.userService.createUser({
					userId,
					password,
					role: Role.CUSTOMER,
				});
				delete user.password;
				delete user.id;
				ok200(res, { ...user });
			} else {
				err400(res, { message: 'User Already Exist.Please Try Again!' });
			}
		} catch (error) {
			console.log(error);

			err500(res, { message: 'Something went wrong. Please Try again later!' });
		}
	};
	login = async (req: Request, res: Response) => {
		let { userId, password } = req.body as unknown as IUser;

		let userExist = await this.userService.getUser(userId as string);
		if (userExist) {
			if (await matchEncryptTo(password as string, userExist.password as string)) {
				delete userExist.password;
				ok200(res, { ...userExist, token: signJWT(JSON.parse(JSON.stringify(userExist))) });
			} else {
				err403(res, { message: 'Password Incorrect!!' });
			}
		} else {
			err400(res, { message: 'User Not Found.Please Try Again!' });
		}
	};
	updateUser = async (req: Request, res: Response) => {
		throw new Error('Method not implemented.');
	};
}

export default UserController;
