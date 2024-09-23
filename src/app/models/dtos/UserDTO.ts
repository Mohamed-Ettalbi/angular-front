// src/app/dto/user.dto.ts
export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isApproved: boolean;
    role: "TECHNICIAN" | "EMPLOYEE" |"[ROLE_TECHNICIAN]"|"[ROLE_EMPLOYEE]";
  }
 
  
  