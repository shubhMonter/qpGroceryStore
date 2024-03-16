import { DataSource } from 'typeorm';
import { Users } from '../models/user';
import { Items } from '../models/item';

const { TYPEORM_HOST, TYPEORM_PORT, TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE } = process.env;

export default new DataSource({
	type: 'postgres',
	host: TYPEORM_HOST,
	port: Number(TYPEORM_PORT),
	username: TYPEORM_USERNAME,
	password: TYPEORM_PASSWORD,
	database: TYPEORM_DATABASE,
	entities: [Users, Items],
	synchronize: true,
	ssl: {
		rejectUnauthorized: false,
	},
});
