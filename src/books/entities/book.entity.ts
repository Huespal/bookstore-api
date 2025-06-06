import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column({ type: 'varchar', length: 64 })
  @Index({ unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 64 })
  author: string;

  @Column()
  cover: string;

  @Column({ default: '0' })
  rating: string;

  @Column({ type: 'varchar', length: 256 })
  synopsis: string;

  @Column({ type: 'varchar', length: 64 })
  title: string;

  @Column({ default: false })
  upvoted: boolean;

  @Column({ type: 'int' })
  upvotes: number;
}
