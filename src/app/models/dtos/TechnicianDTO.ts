// src/app/dto/technician.dto.ts
import { UserDTO } from './UserDTO';

export interface TechnicianDTO extends UserDTO {
  groupId: number;
}
