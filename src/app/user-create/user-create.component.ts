import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
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
      email: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      zipcode: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log('onSubmit', this.userForm.value);
    if (this.userForm.invalid == true) {
      return;
    }
    else {
      this.api.createUser(this.userForm.value).subscribe(res => {

        this.registered = true;
      }, err => {
        console.log(err);

      });
    }
  }
}
