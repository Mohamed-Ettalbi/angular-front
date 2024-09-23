// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import {MatIconModule} from '@angular/material/icon';
// import { AttachmentService } from '../../Services/attachment.service'
// import { CommonModule } from '@angular/common';
// import {MatChipsModule} from '@angular/material/chips';

// @Component({
//   selector: 'app-file-upload',
//   standalone: true,
//   imports: [MatIconModule, CommonModule,MatChipsModule],
//   templateUrl: './file-upload.component.html',
//   styleUrls:[ './file-upload.component.css']
// })
// export class FileUploadComponent {
//  private apiUrl = 'http://localhost:8081/attachment';

//  @Output() onFilesReady = new EventEmitter<FileList | null>();

// @Input() ticketId: number = 35;
//   fileNames: string[] =[];
//   private files: FileList | null = null;
//   fileUploadTouched : boolean = false;


//     constructor( private attachmentService: AttachmentService) {}


//     onFileSelected(event: any) {
//       this.files = event.target.files;
//       if (this.files && this.files.length > 0) {
//         this.fileNames = Array.from(this.files).map(file => file.name);


//         this.onFilesReady.emit(this.files); // Notify that files are ready but not uploaded
//       } else {
//         this.fileNames = [];
//         this.onFilesReady.emit(null);
//       }
//     }
//     uploadFiles() {
//       if (this.files && this.files.length > 0) {
//         const formData = new FormData();
//         Array.from(this.files).forEach(file => {
//           formData.append('files', file);
//         });
  
//         this.attachmentService.uploadMultipleFiles(this.ticketId, formData).subscribe({
//           next: (response) => {
//             console.log('Files uploaded successfully', response);
//           },
//           error: (error: HttpErrorResponse) => {
//             console.error('Error uploading files:', error.message);
//           }
//         });
//       }
//     }
//     removeFile(index: number) {
//       if (this.files) {
//         const filesArray = Array.from(this.files); // Convert FileList to array
//         filesArray.splice(index, 1); // Remove the file at the specified index
//         this.files = this.convertToFileList(filesArray); // Convert back to FileList
//         this.fileNames.splice(index, 1); // Remove corresponding file name
  
//         // Emit the updated files to the parent component
//         if (this.files.length > 0) {
//           this.onFilesReady.emit(this.files);
//         } else {
//           this.onFilesReady.emit(null); // Emit null if no files remain
//         }
//       }
//     }
//     handleFileUploadClick(){
//       this.fileUploadTouched = !this.fileUploadTouched;
//     }
  
//     // Convert array of files back to FileList
//     private convertToFileList(files: File[]): FileList {
//       const dataTransfer = new DataTransfer();
//       files.forEach(file => dataTransfer.items.add(file));
//       return dataTransfer.files;
//     }

  

//         // onFileSelected(event: any) {
//         //   const files: FileList = event.target.files;
      
//         //   if (files.length > 0) {
//         //     const formData = new FormData();
      
//         //     if (files.length === 1) {
//         //       formData.append('file', files[0]);  
//         //       this.fileNames.push(files[0].name);
//         //       console.log("using the upload one file method")
      
//         //       this.attachmentService.uploadFile(this.ticketId, formData).subscribe({
//         //         next: (response) => {
//         //           console.log('File uploaded successfully', response);
//         //         },
//         //         error: (error: HttpErrorResponse) => {
//         //           console.error('Error uploading file:', error);
//         //         }
//         //       });
      
//         //     } else {
//         //       for (let i = 0; i < files.length; i++) {
//         //         formData.append('files', files[i]); 
//         //         this.fileNames.push(files[i].name);
//         //       }
//         //       console.log("using the upload many files method")
             
//         //       this.attachmentService.uploadMultipleFiles(this.ticketId, formData).subscribe({
//         //         next: (response) => {
//         //           console.log('Files uploaded successfully', response);
//         //         },
//         //         error: (error: HttpErrorResponse) => {
//         //           console.error('Error uploading files:', error);
//         //         }
//         //       });
//         //     }
//         //   } else {
//         //     alert('No files selected');
//         //   }
//         // }
          
//         }
    
    
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AttachmentService } from '../../Services/attachment.service';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatChipsModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  private apiUrl = 'http://localhost:8081/attachment';

  @Output() onFilesReady = new EventEmitter<FileList | null>();

  @Input() ticketId: number = 35;
  fileNames: string[] = [];
  private files: FileList | null = null;
  fileUploadTouched: boolean = false;
  maxFileSize = 5 * 1024 * 1024; // 5 MB file size limit
  allowedFileTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf','text/plain'];

  constructor(private attachmentService: AttachmentService, private snackBar: MatSnackBar) {}

  onFileSelected(event: any) {
    this.files = event.target.files;
    if (this.files && this.files.length > 0) {
      const validFiles = Array.from(this.files).filter(file => this.validateFile(file));
      if (validFiles.length > 0) {
        this.fileNames = validFiles.map(file => file.name);
        this.onFilesReady.emit(this.convertToFileList(validFiles)); // Emit valid files
      } else {
        this.fileNames = [];
        this.onFilesReady.emit(null);
      }
    } else {
      this.fileNames = [];
      this.onFilesReady.emit(null);
    }
  }

  validateFile(file: File): boolean {
    if (!this.allowedFileTypes.includes(file.type)) {
      this.snackBar.open(`Invalid file type: ${file.name}`, 'Close', { duration: 3000 });
      return false;
    }
    if (file.size > this.maxFileSize) {
      this.snackBar.open(`File is too large: ${file.name}`, 'Close', { duration: 3000 });
      return false;
    }
    return true;
  }

  uploadFiles() {
    if (this.files && this.files.length > 0) {
      const formData = new FormData();
      Array.from(this.files).forEach(file => formData.append('files', file));

      this.attachmentService.uploadMultipleFiles(this.ticketId, formData).subscribe({
        next: (response) => {
          console.log('Files uploaded successfully', response);
          this.snackBar.open('Files uploaded successfully!', 'Close', { duration: 3000 });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error uploading files:', error.message);
          this.snackBar.open('Error uploading files.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  removeFile(index: number) {
    if (this.files) {
      const filesArray = Array.from(this.files); // Convert FileList to array
      filesArray.splice(index, 1); // Remove the file at the specified index
      this.files = this.convertToFileList(filesArray); // Convert back to FileList
      this.fileNames.splice(index, 1); // Remove corresponding file name

      // Emit the updated files to the parent component
      if (this.files.length > 0) {
        this.onFilesReady.emit(this.files);
      } else {
        this.onFilesReady.emit(null); // Emit null if no files remain
      }
    }
  }

  handleFileUploadClick() {
    this.fileUploadTouched = !this.fileUploadTouched;
  }

  // Convert array of files back to FileList
  private convertToFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    return dataTransfer.files;
  }
}
