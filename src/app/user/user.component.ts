import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(
    private api: ApiService,
    private router: Router,
    private notifierService: NotifierService

  ) {
    this.notifier = notifierService;
  }
  users: any;
  ngOnInit() {
    this.api.getUsers().subscribe(res => {
      this.users = res.Items;
    }, err => {
      console.log(err);
    })
  }
  editUser(user) {
    this.router.navigate(['/user-edit', user.id]);
  }
  remoteUser(user) {
    this.api.deleteUser(user.id).subscribe(res => {
      this.notifier.notify('success', 'Remove user success!');
      this.api.getUsers().subscribe(res => {
        this.users = res.Items;
      }, err => {
        console.log(err);
      })
    }, err => {
      console.log(err);
    })
  }
}
