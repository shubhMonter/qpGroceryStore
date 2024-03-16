import { Router } from 'express';
import UserController from '../controller/user/user.controller';
import APIVersion from '../constants/api-version.constant';
import UserService from '../services/user/user.services';
const userService = new UserService();
const userController = new UserController(userService);

const userRoutes = Router();

userRoutes.post(`/${APIVersion.v1}/admin/register`, userController.registerAdmin);
userRoutes.post(`/${APIVersion.v1}/register`, userController.registerCustomer);
userRoutes.post(`/${APIVersion.v1}/login`, userController.login);

export default userRoutes;
