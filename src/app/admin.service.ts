import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface ResourceList {
  name: string;
  extension: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  getResourceList(): Observable<ResourceList[]> {
    return this.http.get(environment.apiUrl + '/getFileNames') as Observable<
      ResourceList[]
    >;
  }
  downloadResource(resource: ResourceList) {
    window.open(
      environment.apiUrl +
        '/download?name=' +
        resource.name +
        resource.extension
    );
  }
  uploadResource(title: string, file: File) {
    const formData = new FormData();
    formData.append('resource', file);
    // formData.append('fileName', title);
    return this.http.post(
      environment.apiUrl + '/uploadFile?fileName=' + title,
      formData
    );
  }
}
