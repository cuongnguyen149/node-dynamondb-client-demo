import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService

  ) {
    this.notifier = notifierService;

  }
  user: any;
  userID: any;
  invalidUserName() {
    return (this.submitted && this.userForm.controls.user_name.errors != null);
  }

  invalidEmail() {
    return (this.submitted && this.userForm.controls.email.errors != null);
  }

  invalidZipcode() {
    return (this.submitted && this.userForm.controls.zipcode.errors != null);
  }

  invalidDOB() {
    return (this.submitted && this.userForm.controls.dob.errors != null);
  }
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      // email: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      zipcode: ['', Validators.required],
      // zipcode: ['', Validators.required],
      dob: ['', Validators.required]
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.userID = params.get("id")
      this.api.getUsersById(this.userID).subscribe(res => {
        this.user = res.Items[0];
        this.userForm.controls.user_name.setValue(this.user.userName);
        this.userForm.controls.email.setValue(this.user.email);
        this.userForm.controls.zipcode.setValue(this.user.zipcode);
        this.userForm.controls.dob.setValue(this.user.dob);
      }, err => {
        console.log(err);
      })
    })
  }
  onSubmit() {
    this.submitted = true;
    console.log('onSubmit', this.userForm.value);
    if (this.userForm.invalid == true) {
      return;
    }
    else {
      this.api.updateUser(this.userID, this.userForm.value).subscribe(res => {
        this.notifier.notify('success', 'Update user success!');
        this.registered = true;
        this.router.navigate(['/users']);
      }, err => {
        console.log(err);

      });
    }
  }
  removeUser() {
    this.api.deleteUser(this.userID).subscribe(res => {
      this.notifier.notify('success', 'Remove user success!');
      this.registered = true;
      this.router.navigate(['/users']);
    }, err => {
      console.log(err);
    });
  }
}
