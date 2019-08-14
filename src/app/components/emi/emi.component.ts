import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.less']
})
export class EmiComponent implements OnInit {

  form: FormGroup;
  formConfig = {
    loan: [null, [Validators.required]],
    rate: [null, [Validators.required]],
    term: [null, [Validators.required]],
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

    this.http.post<{data: any}>('http://localhost:8088/operator1', this.form.value).subscribe({
      next: value => {
        alert('So tien hang thang : ' + value.data.amount);
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
