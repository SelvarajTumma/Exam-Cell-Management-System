import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const baseurl="http://localhost:8080/api";
@Injectable({
  providedIn: 'root'
  
})

export class ExamSystemService {
  
  constructor(private http:HttpClient) { }
  login(data) {
    return this.http.post(baseurl+'/check',{
      "username":data.username,
      "password":data.password
    }
    );
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
    return this.http.post(baseurl+`/set_timetable`,{
      Regulation:timetable.Regulation,
      Dept:timetable.Dept,
      Semester:timetable.Semester,
      year:timetable.year,
      subjects:timetable.subjects,
      month:timetable.month
    });
  }
  get_timetable(fetch_timetable){
    return this.http.post(baseurl+"/get_timetable",{fetch_timetable});
  }
  edit_Timetable(updated_timetable,key){
    return this.http.post(baseurl+'/update_timetable',{updated_timetable,key});
  }
  delete_timetable(id){
    return this.http.get(baseurl+`/Delete/${id}`);
  }
  getFees(number:number){
    return this.http.get(baseurl+`/fees/${number}`);
  }
  payFees(details:any){
    return this.http.post(baseurl+"/ExamFees",{
      username:details.username,
      Regulation:details.Regulation,
      Semester:details.Semester,
      Department:details.Department,
      Fees:details.Fees,
      subjects:details.subjects
    })
  }
  paidlist(data:any){
    return this.http.post(baseurl+"/paidList",{
      username:data.RollNo,
      semester:data.Semester
    }
    );
  }
  paidlistus(username:String){
    return this.http.get(baseurl+`/paidList/${username}`);
  }
  getCollege(){
    return this.http.get(baseurl+"/collegeDetails");
  }
  setmarks(marks:any){
    return this.http.post(baseurl+"/Marks",{
      "RollNo":marks.RollNo,
      "Regulation": marks.Regulation,
      "Dept": marks.Dept,
      "subjects": marks.subjects,
      "semester": marks.semester
    }
    )
  }
  getmarks(data: any){
    return this.http.post(baseurl+"/getMarks",{RollNo:data.RollNo,semester:data.semester})
  }
  Deletemarks(id:String){
    return this.http.delete(baseurl+`/DeleteRecord/${id}`)
  }
  EditMarks(data:any,key:String){
  return this.http.post(baseurl+"/EditMarks",{id:key ,subjects:data.subjects})
  }
}
