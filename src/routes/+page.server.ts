import { db } from '#lib/db.ts';
import { Post } from '#lib/models/Post.ts';

export async function load() {
	let postsRepository = db.getRepository(Post);
	let posts = await postsRepository.find({ order: { createdAt: 'DESC' } });

	//console.log(posts);
	return {
		posts: posts.map((p) => ({
			id: p.id,
			title: p.title,
			description: p.description,
			cover: p.cover,
			content: p.content,
			isPublished: p.isPublished,
			createdAt: p.createdAt,
			updatedAt: p.updatedAt,
			userId: p.userId
		}))
	};
}
