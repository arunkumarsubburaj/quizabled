import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss'],
})
export class AddResourceComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private adminService: AdminService
  ) {}
  title!: string;
  file!: File | null;
  @ViewChild('fileEle') fileEle!: ElementRef;
  ngOnInit() {}
  uploadResource() {
    console.log({ title: this.title, file: this.file });
    if (this.title && this.file) {
      this.adminService.uploadResource(this.title, this.file).subscribe(
        (res) => {
          this.toastrService.success(
            'File Uploaded Successfully!!!',
            'Success'
          );
          this.title = '';
          this.file = null;
          this.fileEle.nativeElement.value = null;
        },
        (err) => {
          this.toastrService.error(err.statusCode, 'File Upload Error');
        }
      );
    } else {
      this.toastrService.error(
        'Please fill All mandatory Items to proceed! ',
        'Error'
      );
    }
  }
  setFile(eve: any) {
    const files: FileList | null = (eve.currentTarget as HTMLInputElement)
      ?.files;
    this.file = files && files.length > 0 ? (files[0] as File) : null;
  }
}
