import { Router } from 'express';
import OrderController from '../controller/order/order.controller';
import OrdersService from '../services/order/order.service';
import OrderItemService from '../services/orderItem/orderItem.service';
import { itemService } from './item.routes';
import APIVersion from '../constants/api-version.constant';
import { authInterceptor } from '../middlewares/auth.middleware';

const orderItem = new OrderItemService();
const Order = new OrdersService();
const orderController = new OrderController(orderItem, Order, itemService);

const orderRoutes = Router();

orderRoutes.post(
	`/${APIVersion.v1}/order`,
	//authInterceptor,
	orderController.createOrder
);

orderRoutes.get(`/${APIVersion.v1}/order/:id`, orderController.getorderById);

export default orderRoutes;
