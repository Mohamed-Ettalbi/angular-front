import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/dtos/UserDTO';
import { TechnicianDTO } from '../models/dtos/TechnicianDTO';
import { GroupDTO } from '../models/dtos/GroupDTO';
import { AddGroupDTO } from '../models/dtos/AddGroupDTO';

@Injectable({
  providedIn: 'root'
})
export class UserGroupListService {

  private apiUrl = 'http://localhost:8081/api';
  constructor(private http : HttpClient) {}
// users section
  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/user/all`);
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/user/${id}`);
  }

  updateUser(id: number, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.apiUrl}/user/update/${id}`, user);
  }

  getAllTechnicians(): Observable<TechnicianDTO[]> {
    return this.http.get<TechnicianDTO[]>(`${this.apiUrl}/technician/all`);
  }

  removeTechnicianFromGroup(technicianId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/technician/removefromgroup/${technicianId}`, null);
  }


  //group section

  getAllGroups(): Observable<GroupDTO[]> {
    return this.http.get<GroupDTO[]>(`${this.apiUrl}/group/all`);
  }

  getGroupById(id: number): Observable<GroupDTO> {
    return this.http.get<GroupDTO>(`${this.apiUrl}/group/${id}`);
  }

  getTechniciansByGroupId(id: number): Observable<TechnicianDTO[]> {
    return this.http.get<TechnicianDTO[]>(`${this.apiUrl}/group/${id}/technicians`);
  }

  addGroup(data: AddGroupDTO): Observable<GroupDTO> {
    return this.http.post<GroupDTO>(`${this.apiUrl}/group/add`, data);
  }

  updateGroupInfo(id: number, data: AddGroupDTO): Observable<GroupDTO> {
    return this.http.put<GroupDTO>(`${this.apiUrl}/group/update/${id}`, data);
  }

  deleteGroup(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${this.apiUrl}/group/delete/${id}`, { 
      observe: 'response', 
      responseType: 'text' as 'json'
    });
  }
  addTechnicianToGroup(groupId: number, technicianId: number): Observable<HttpResponse<string>> {
   return this.http.put<string>(`${this.apiUrl}/admin/groups/${groupId}/add/${technicianId}`, null , { 
    observe: 'response', 
    responseType: 'text' as 'json'
  });
}
}














