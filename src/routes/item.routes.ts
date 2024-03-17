import { Router } from 'express';
import APIVersion from '../constants/api-version.constant';
import ItemsService from '../services/item/item.service';
import ItemsController from '../controller/item/item.controller';
import RoleMiddleware from '../middlewares/role.middleware';
import { authInterceptor } from '../middlewares/auth.middleware';

export const itemService = new ItemsService();
const itemsController = new ItemsController(itemService);
const itemRoutes = Router();

itemRoutes.get(`/${APIVersion.v1}/item/:id`, authInterceptor, itemsController.getById);
itemRoutes.get(`/${APIVersion.v1}/item`, authInterceptor, itemsController.getAll);
itemRoutes.post(`/${APIVersion.v1}/item`, RoleMiddleware.isAdmin, authInterceptor, itemsController.addItem);
itemRoutes.put(`/${APIVersion.v1}/item/:id`, RoleMiddleware.isAdmin, authInterceptor, itemsController.updateById);
itemRoutes.delete(`/${APIVersion.v1}/item/:id`, RoleMiddleware.isAdmin, authInterceptor, itemsController.deleteById);

export default itemRoutes;
