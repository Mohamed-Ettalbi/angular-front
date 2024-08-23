import { TechnicianDTOResponse } from "./technician";
import { UserDTO } from "./user";

export interface AuthResponse {
    token: string;
    user: UserDTO | TechnicianDTOResponse;
  }


export interface Creds {
    username: string;
    password: string;
  }