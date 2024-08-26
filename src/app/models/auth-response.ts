import { UserDTO } from "../dtos/UserDTO";
import { TechnicianDTO } from "../dtos/TechnicianDTO";

export interface AuthResponse {
    token: string;
    user: UserDTO | TechnicianDTO;
  }

