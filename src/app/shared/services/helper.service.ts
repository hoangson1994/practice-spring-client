import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { ACCESS_TOKEN_SECRET_KEY } from '../resources/static.resource';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private authorizeHeader;
  constructor(private http: HttpClient) { }

  /**
   * - Custom upload a img
   * - Please check
   * https://github.com/NG-ZORRO/ng-zorro-antd/blob/cab0536d404aadced9092d7ee82dcb7bf0a7d411/src/components/upload/nz-upload-btn.component.ts
   * From line 169 - 186
   * @param url: string Url to upload image
   * @param item: item that include, provide by upload btn.
   */
  nzCustomUploadImg(url: string, item: any): Promise<any> {
    const form = new FormData();
    form.append('file', item.file);

    const req = new HttpRequest('POST', url, form, {
      reportProgress: true
    });
    return new Promise<any>((s, e) => {
      this.http.request(req).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            event.percent = event.loaded / event.total * 100;
          }
          item.onProgress(event);
        } else if (event instanceof HttpResponse) {
          item.onSuccess(event.body, event);
          s(event.body.data);
        }
      }, err => {
        item.onError(err);
        e(err);
      });
    });
  }

  getAuth(): any {
    if (!this.authorizeHeader) {
      this.authorizeHeader = {
        authorization: localStorage.getItem(ACCESS_TOKEN_SECRET_KEY),
        'Content-Type': 'application/json'
      };
    }
    return this.authorizeHeader;
  }

  enumToKeyValue(data: any) {
    const result = [];
    Object.keys(data).forEach(k => {
      try {
        const key = Number(k);
        if (key || key === 0) {
          result.push({
            key,
            value: data[key]
          });
        }
      } catch (e) {
      }
    });
    return result;
  }

  updateAFormField(field, value) {
    field.setValue(value);
    field.markAsDirty();
    field.updateValueAndValidity();
  }

  setDirtyAForm(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      form.get(field).markAsDirty();
      form.get(field).updateValueAndValidity();
    });
  }

  setPristineAForm(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      form.get(field).markAsPristine();
      form.get(field).updateValueAndValidity();
    });
  }

  setValueToForm(form: FormGroup, data: any, setPristine: boolean = false) {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].setValue(data[key]);
      if (setPristine) {
        form.controls[key].markAsPristine();
      }
    });
    form.updateValueAndValidity();
    return form;
  }

  comparePasswordValidator(originControl: AbstractControl) {
    return (control: AbstractControl) => {
      const password = originControl.value; // to get value in input tag
      const confirmPassword = control.value; // to get value in input tag
      if (password === confirmPassword) {
        return null; // All ok, passwords match!!!
      } else {
        return { comparePassword: true };
      }
    };
  }

  // handleError(err) {
  //   console.log(err);
  //   if (err) {
  //     if (err.status === 403) {
  //       this.notify.error('Thất bại', 'Lỗi xác thực hoặc phiên làm việc đã hết hạn.');
  //       this.router.navigate(['/' + ERouters.login]);
  //       this.authService.logout();
  //       return;
  //     }
  //   }

  //   this.notify.error('Thất bại', 'Vui lòng thử lại sau');
  // }
}
