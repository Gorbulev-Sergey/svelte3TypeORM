import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from './models/Post';

export const db = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: '9Element',
	database: 'typeORM',
	entities: [Post],
	synchronize: true // в проде — только миграции
});
