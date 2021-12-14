import {
  LogObj,
  StudentData,
  UpdatePayLoad,
} from './student-details/student.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface ResourceList {
  name: string;
  extension: string;
}
export interface MarkPayload {
  studentId: number;
  totalMark: number;
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
  getStudentList() {
    return this.http.get(environment.apiUrl + '/getStudents') as Observable<
      StudentData[]
    >;
  }
  updateQuizStatus(studentId: number, payload: UpdatePayLoad) {
    return this.http.post(
      environment.apiUrl + '/updateQuizStatus?studentId=' + studentId,
      payload
    );
  }
  addQuizLog(studentId: string, payload: { answerObj: LogObj[] }) {
    return this.http.post(
      environment.apiUrl + '/addStudentLog?studentId=' + studentId,
      payload
    );
  }
  showQuizLog(studentId: string) {
    return this.http.get(
      environment.apiUrl + '/getStudentLog?studentId=' + studentId
    ) as Observable<LogObj[]>;
  }
  updateMarks(payLoad: MarkPayload) {
    return this.http.post(`${environment.apiUrl}/updateStudentMark`, payLoad);
  }
  unlockStudent(studentId: number) {
    return this.http.get(
      environment.apiUrl + '/unlockStudent?studentId=' + studentId
    );
  }
}
