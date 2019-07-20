import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from '../services/storage.service';

@Component({
  selector: "app-input-box",
  templateUrl: "./input-box.component.html",
  styleUrls: ["./input-box.component.css"]
})
export class InputBoxComponent implements OnInit {
  public properties: InputModalProperties;
  public inputValue = "";
  public selectedFiles: FileList;

  constructor(
    public activeModal: NgbActiveModal,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  save() {
    this.activeModal.close(this.inputValue);
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.storageService.uploadFile(file).subscribe(response => {
      console.log(response);
      this.activeModal.close(response);
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}

export class InputModalProperties {
  title: string;
  message: string;
}
