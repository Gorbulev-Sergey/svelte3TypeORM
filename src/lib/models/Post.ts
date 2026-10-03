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

	@Column({ type: 'text' })
	title?: string;

	@Column({ type: 'text' })
	description?: string;

	@Column({ type: 'text' })
	cover?: string;

	@Column({ type: 'text' })
	content?: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@Column({ type: 'text' })
	userId?: string;
}
