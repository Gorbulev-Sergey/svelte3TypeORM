import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn
} from 'typeorm';

@Entity('posts')
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ type: 'varchar', length: 255 })
	title?: string;

	@Column({ type: 'text' })
	description?: string | null;

	@Column({ type: 'varchar', length: 255 })
	cover?: string | null;

	@Column({ type: 'text' })
	content?: string;

	@Column({ default: true })
	isPublished?: boolean;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@Column({ type: 'varchar', length: 255 })
	userId?: string | null;
}
