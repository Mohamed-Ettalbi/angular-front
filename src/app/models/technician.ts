// src/app/models/technician.model.ts
import { User } from './user';

export class Technician extends User {

  //when creting a new technician, we don't directly  assign him to a group so until he is assigned to a group,
  //groupId will be undefined it's null in the db
    groupId?: number ;

  constructor(
    id?: number,
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    phone: string = '',
    groupId?: number ,
    password?: string,
    isApproved?: boolean
  ) {
    super(id, firstName, lastName, email, phone, "TECHNICIAN", password, isApproved);
    this.groupId = groupId;
  }
}
