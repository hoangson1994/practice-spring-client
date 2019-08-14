import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-emi2',
  templateUrl: './emi2.component.html',
  styleUrls: ['./emi2.component.less']
})
export class Emi2Component implements OnInit {

  form: FormGroup;
  formConfig = {
    month: [null, [Validators.required]],
    fee: [null, [Validators.required]],
  };
  amount: any;

  constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router
  ) {
    this.form = this.fb.group(this.formConfig);
  }

  ngOnInit() {
  }

  submitForm() {
    this.setDirtyAForm(this.form);
    if (this.form.invalid) {
      return;
    }

    this.http.post<{data: any}>('http://localhost:8088/operator2', this.form.value).subscribe({
      next: value => {
        alert('So tien phai tra : ' + value.data.amount);
      },
      error: err => {console.log(err);
      }
    });
  }

  setDirtyAForm(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      form.get(field).markAsDirty();
      form.get(field).updateValueAndValidity();
    });
  }

}
