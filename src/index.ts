import express, { Express, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { getEnvValue, getEnvironment } from './configs/env.config';
import APIVersion from './constants/api-version.constant';
import { appLogger } from './configs/logger.config';
import { authInterceptor } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';
import Database from './database/database';
import allRoutes from './routes';

// initialize express app
const app: Express = express();

// app port
const port = getEnvValue('PORT') || 4000;

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(authInterceptor);

// global error handler
app.use(errorHandler);

// routes
for (let route in allRoutes) {
	app.use(allRoutes[route]);
}

// start the server
app.listen(port, async () => {
	Database.initialize()
		.then((res) => {
			console.log('DB connect !!');
		})
		.catch((err) => {
			console.log(err);
		});
	appLogger.info('Active environment: %s', getEnvironment());
	appLogger.info('Server is running at http://localhost:%s', port);
});
