import { TechnicianDTO } from "./TechnicianDTO";

export interface GroupDTO {
    groupId: number;
    groupName: string;
    groupDescription: string;
    technicianDTOResponseList: TechnicianDTO[];
  }
  