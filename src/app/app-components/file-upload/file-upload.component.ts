import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AttachmentService } from '../../Services/attachment.service'
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './file-upload.component.html',
  styleUrls:[ './file-upload.component.css']
})
export class FileUploadComponent {
 private apiUrl = 'http://localhost:8081/attachment';
@Input() ticketId: number = 35;
  fileNames: string[] =[];

    constructor( private attachmentService: AttachmentService) {}


        onFileSelected(event: any) {
          const files: FileList = event.target.files;
      
          if (files.length > 0) {
            const formData = new FormData();
      
            if (files.length === 1) {
              formData.append('file', files[0]);  
              this.fileNames.push(files[0].name);
              console.log("using the upload one file method")
      
              this.attachmentService.uploadFile(this.ticketId, formData).subscribe({
                next: (response) => {
                  console.log('File uploaded successfully', response);
                },
                error: (error: HttpErrorResponse) => {
                  console.error('Error uploading file:', error.message);
                }
              });
      
            } else {
              for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]); 
                this.fileNames.push(files[i].name);
              }
              console.log("using the upload many files method")
             
              this.attachmentService.uploadMultipleFiles(this.ticketId, formData).subscribe({
                next: (response) => {
                  console.log('Files uploaded successfully', response);
                },
                error: (error: HttpErrorResponse) => {
                  console.error('Error uploading files:', error.message);
                }
              });
            }
          } else {
            alert('No files selected');
          }
        }
          
        }
    
    


