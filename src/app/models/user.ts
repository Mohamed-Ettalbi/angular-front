// src/app/models/user.model.ts
export class User {
  id?: number;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password?: string;
  isApproved?: boolean;
  role: "TECHNICIAN" | "EMPLOYEE" = "EMPLOYEE";

  constructor(
    id?: number,
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    phone: string = '',
    role: "TECHNICIAN" | "EMPLOYEE" = "EMPLOYEE",
    password?: string,
    isApproved?: boolean
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.password = password;
    this.isApproved = isApproved;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
