import { ResourceList } from './../admin.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit, AfterViewInit {
  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {}
  resourceList: any = [];
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.adminService.getResourceList().subscribe(
      (responseList: ResourceList[]) => {
        responseList.forEach((response) => {
          const returnObj: any = {};
          returnObj['url'] =
            environment.resourceUrl + '/' + response.name + response.extension;
          returnObj['extension'] = response.extension;
          returnObj['name'] = response.name;
          let fileNameArray = response.name.split('_');
          fileNameArray.splice(0, 1);
          returnObj['title'] = fileNameArray.join(' ');
          this.resourceList.push(returnObj);
        });
      },
      (err) => {
        console.log(err);
        this.toastrService.error(err.statusText, 'Error');
      }
    );
  }
  downloadResource(resource: ResourceList) {
    window.open(
      environment.apiUrl +
        '/download?name=' +
        resource.name +
        resource.extension
    );
  }
}
