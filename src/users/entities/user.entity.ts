import { Exclude } from 'class-transformer';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64 })
  @Index({ unique: true })
  username: string;

  @Column({ type: 'varchar', length: 64 })
  @Index({ unique: true })
  firstName: string;

  @Column({ type: 'varchar', length: 64 })
  lastName: string;

  @Column({ type: 'varchar', length: 64 })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  @Exclude()
  refreshToken: string;
}
