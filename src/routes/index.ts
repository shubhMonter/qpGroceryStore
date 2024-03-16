import { Router } from 'express';
import userRoutes from './user.routes';
import itemRoutes from './item.routes';

export default {
	userRoutes,
	itemRoutes,
} as Record<string, Router>;
