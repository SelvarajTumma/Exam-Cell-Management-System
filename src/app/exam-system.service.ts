import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
const baseurl="http://localhost:8080/api";
@Injectable({
  providedIn: 'root'
  
})

export class ExamSystemService {
  
  constructor(private http:HttpClient) { }
  login(data) {
    return this.http.post(baseurl+'/check',{"username":data.username,"password":data.password});
  }
  update_password(data){
    return this.http.post(baseurl+"updatePassword",data);
  }
  getall(){
    return this.http.get(baseurl);
  }
  getStudentDetails(username:string){
    return this.http.get(baseurl+`/StudentData/${username}`);
  }
}
