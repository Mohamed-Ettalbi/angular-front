export class User {
    firstName= '';
    lastName='';
    email= '';
    phone= '';
    password='';
    role: "TECHNICIAN" | "EMPLOYEE" ="EMPLOYEE";

  }

export interface UserDTO {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isApproved: boolean;
    role: string;
  }
  
