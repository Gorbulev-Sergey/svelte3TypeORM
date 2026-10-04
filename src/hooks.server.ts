import 'reflect-metadata';
import { db } from '#lib/db.js';

export async function handle({ event, resolve }) {
	// инициализируем БД один раз при старте сервера

	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
	} catch (error) {}

	console.log(db.isInitialized);

	return await resolve(event);
}
