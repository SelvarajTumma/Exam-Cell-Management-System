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
  getsubjects(data){
    return this.http.post(baseurl+`/getSubjects`,{data});
  }
  set_timetable(timetable){
    return this.http.post(baseurl+`/set_timetable`,{Regulation:timetable.Regulation,Dept:timetable.Dept,Semester:timetable.Semester,year:timetable.year,subjects:timetable.subjects,month:timetable.month});
  }
  get_timetable(fetch_timetable){
    return this.http.post(baseurl+"/get_timetable",{fetch_timetable});
  }
  edit_Timetable(updated_timetable,key){
    return this.http.post(baseurl+'/update_timetable',{updated_timetable,key});
  }
  delete_timetable(id){
    return this.http.get(baseurl+`/delete_timetable/?${id}`);
  }
}
