import { db } from '#lib/db.ts';
import { Post } from '#lib/models/Post.ts';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	let postsRepository = db.getRepository(Post);
	let posts = await postsRepository.find({ order: { createdAt: 'DESC' } });
	return json(posts);
}

export async function POST({ request }) {
	const { title, description, cover, content, isPublished = true, userId } = await request.json();

	try {
		const posts = db.getRepository(Post);
		const newPost = posts.create({
			title: title.trim(),
			description: description,
			cover: cover,
			content: content || '',
			isPublished,
			userId: userId
		});

		const savedPost = await posts.save(newPost);
		if (savedPost.id) return new Response(JSON.stringify(savedPost));
	} catch (error) {}
}

export async function DELETE({ request }) {
	let { id } = await request.json();

	try {
		let postsRepository = db.getRepository(Post);
		let result = await postsRepository.delete(id);
		if (result.affected === 0) {
			return error(404, 'Пост не найден');
		}
		return json({ success: true, message: 'Пост удалён' });
	} catch (er) {
		return error(500, 'Ошибка при удалении поста');
	}
}
