import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    image: string;
    
    constructor (
      email: string, 
      firstName: string, 
      lastName: string, 
      image?: string, 
      id?: number) {
        super();
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
    }
}
