import { Component, OnInit } from "@angular/core";
import { MsAdalAngular6Service } from "microsoft-adal-angular6";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"]
})
export class NavMenuComponent implements OnInit {
  public userLoggedIn: boolean = false;
  constructor(private adalSvc: MsAdalAngular6Service) {
    this.userLoggedIn = this.adalSvc.isAuthenticated;
  }

  logOut() {
    console.log("aman");
    this.adalSvc.logout();
  }

  ngOnInit() {}
}
