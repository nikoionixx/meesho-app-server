import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  emailId: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true })
  phoneNumber: string;
}
