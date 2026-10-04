<script lang="ts">
	import Column from '#lib/components/Column.svelte';
	import { Post } from '#lib/models/Post.ts';
	import { refreshAll } from '$app/navigation';

	let { data } = $props();
	let newPost = $state<Post>({});

	async function createPost(post: Post) {
		const res = await fetch('/api/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(post)
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
			<div>Описание</div>
			<input class="form-control form-control-sm" bind:value={newPost.description} />
		</div>
		<div>
			<div>Содержимое</div>
			<textarea class="form-control form-control-sm" bind:value={newPost.content}></textarea>
		</div>
		<div>
			<div>Фотография (url)</div>
			<input class="form-control form-control-sm" bind:value={newPost.cover} />
			{#if newPost.cover}
				<div
					class="rounded-1 mt-2"
					style="background-image: url({newPost.cover}); background-size: cover; background-position: center; width: 20em; height: 12em;"
				></div>
			{/if}
		</div>
		<div>
			<button
				class="btn btn-sm btn-dark text-light"
				onclick={async () => {
					newPost.userId = '';
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
			<div class="row row-cols-3 g-2">
				{#each data.posts as post}
					<div class="col h-100">
						<div class="d-flex flex-column gap-1 bg-light p-2 rounded">
							<div class="d-flex align-items-center justify-content-between">
								<b class="text-uppercase">{post.title}</b>
								<div class="d-flex align-items-center gap-2">
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
							</div>
							{#if post.createdAt}
								<small>
									{new Date(post.createdAt).toLocaleDateString('ru-ru', {
										weekday: 'short',
										day: 'numeric',
										month: 'long',
										year: 'numeric'
									})}
								</small>
							{/if}
							{#if post.description}
								<div class="small text-secondary">{@html post.description}</div>
							{/if}
							{#if post.cover}
								<div
									class="rounded-1"
									style="background-image: url({post.cover}); background-size: cover; background-position: center;  height: 12em;"
								></div>
							{/if}
							{#if post.content}
								<div>{@html post.content}</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Column>
