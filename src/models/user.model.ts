import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', orderBy: {firstName: "ASC"} })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    image: string;

    @Column({type: 'bytea', nullable: true})
    pdf: Uint8Array;
    
    constructor (
      email: string, 
      firstName: string, 
      lastName: string, 
      image?: string, 
      id?: number,
      pdf?: Uint8Array) {
        super();
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
        this.pdf = pdf;
    }
}
