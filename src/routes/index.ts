import { Router } from 'express';
import userRoutes from './user.routes';
import itemRoutes from './item.routes';
import orderRoutes from './order.routes';

export default {
	userRoutes,
	itemRoutes,
	orderRoutes,
} as Record<string, Router>;
