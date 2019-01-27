import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private api: ApiService) { }
  users: any;
  ngOnInit() {
    this.api.getUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    }, err => {
      console.log(err);
    })
  }

}
