<script lang="ts">
	import Column from '#lib/components/Column.svelte';
	import { Post } from '#lib/models/Post.ts';
	import { refreshAll } from '$app/navigation';

	let { data } = $props();
	let newPost = $state<Post>({} as Post);

	async function createPost(p: Post) {
		const res = await fetch('/api/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(p)
		});
		return await res.json();
	}
</script>

<Column>
	<h2>Публикации</h2>
	<div class="d-flex flex-column gap-2 bg-light rounded-1 p-3">
		<h4>Новая публикация</h4>
		<div>
			<div>Заголовок</div>
			<input class="form-control form-control-sm" bind:value={newPost.title} />
		</div>
		<div>
			<div>Содержимое</div>
			<textarea class="form-control form-control-sm" bind:value={newPost.content}></textarea>
		</div>
		<div>
			<button
				class="btn btn-sm btn-dark text-light"
				onclick={async () => {
					await createPost(newPost).then(async () => {
						newPost = new Post();
						refreshAll();
					});
				}}>Создать пост</button
			>
		</div>
	</div>

	<div>
		<h4>Список публикаций</h4>
		<div class="d-flex flex-column gap-2">
			{#each data.posts as post}
				<div class="d-flex flex-column gap-1 bg-light p-2 rounded">
					<div class="d-flex align-items-center justify-content-between">
						<b class=" text-uppercase">{post.title}</b>
						<button
							class="btn btn-sm btn-danger text-dark"
							onclick={async () => {
								await fetch('/api/posts', {
									method: 'DELETE',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({ id: post.id })
								}).then((_) => refreshAll());
							}}
						>
							<b>Удалить</b>
						</button>
					</div>
					<div>{@html post.content}</div>
				</div>
			{/each}
		</div>
	</div>
</Column>
