import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-input-person-box",
  templateUrl: "./input-box-person.component.html",
  styleUrls: ["./input-box-person.component.css"]
})
export class InputBoxPersonComponent implements OnInit {
  
  public name: string = "";
  public age: string = "";
  public place: string = "";
  public city: string = "";
  public state: string = "";
  public birthMarks: string = "";
  public fathersName: string = "";
  public contactName: string = "";
  public contactNo: string = "";
  public address: string = "";
  public height: string = "";
  public gender: string = "";
  public inputValue = "";

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  save() {
    let JsonObj={
      name:this.name,
      age:this.age,
      place:this.place,
      city:this.city,
      state:this.state,
      birthMarks:this.birthMarks,
      fathersName:this.fathersName,
      contactName:this.contactName,
      contactNo:this.contactNo,
      address:this.address,
      height:this.height,
      gender:this.gender
    }
    this.activeModal.close(JSON.stringify(JsonObj));
  }
}

