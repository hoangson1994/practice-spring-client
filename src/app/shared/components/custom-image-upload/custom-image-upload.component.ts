import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { BASE_URL } from '../../resources/static.resource';
import { UploadFile } from 'ng-zorro-antd';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DEFAULT_URL = `${BASE_URL}upload-image`;

@Component({
  selector: 'app-custom-image-upload',
  templateUrl: './custom-image-upload.component.html',
  styleUrls: ['./custom-image-upload.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomImageUploadComponent),
      multi: true
    }
  ]
})
/**
 * Custom upload ảnh
 * Link upload ảnh có thể sửa trên đầu component hoặc nhập vào khi gọi component
 * Có thể chỉnh sửa phương thức truy xuất response của server tại hàm onImageUpload() {}
 */
export class CustomImageUploadComponent implements OnInit, ControlValueAccessor {
  // Giá trị được component lưu giữ (ở đây là tên ảnh) để bind vào form khi có thay đổi.
  imageNames: string[];
  // Các link ảnh được nhập vào từ input. Do giá trị của formControl có thể là tên ảnh, nên cần nhập thêm link khi cần thiết để hiển thị.
  // Mặc định sẽ set các link ảnh = tên ảnh (trong trường hợp dùng chung)
  private Images: string[];
  // Các object ảnh để hiển thị, được parse ra từ các link ảnh.
  // Tự động setup khi set giá trị mới cho link ảnh.
  displayImages = [];


  get images(): string[] {
    return this.Images;
  }
  @Input()
  set images(value: string[]) {
    this.Images = value;
    this.displayImages = value ? this.Images.map((image, index) => {
      return {
        uid: 0 - index,
        name: image,
        status: 'done',
        url: image
      };
    }) : [];
  }

  // Chế độ up ảnh. Nếu chọn single, giá trị form nhận được sẽ là string, và là array khi chọn multi.
  @Input() mode: 'single' | 'multi';
  // Đi kèm, và chỉ có tác dụng với chế độ multi
  @Input() limitImagesQuantity: number;
  @Input() uploadImageUrl: string;

  private propagateChange: (_: any) => void;

  previewImage;
  previewVisible = false;

  constructor() { }

  ngOnInit() {
    if (!this.uploadImageUrl) {
      this.uploadImageUrl = DEFAULT_URL;
    }
    if (!this.mode || !['single', 'multi'].includes(this.mode)) {
      this.mode = 'single';
    }
  }

  writeValue(val: any) {
    if (val) {
      if (typeof val === 'string') {
        this.imageNames = [val];
      } else {
        this.imageNames = val;
      }
    } else {
      this.imageNames = [];
    }
    if (!this.images) {
      this.images = this.imageNames;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  onUploadImage(event) {
    let willUpdate = false;
    if (event.type === 'success') {
      this.imageNames.push(event.file.response.data.name);
      willUpdate = true;
    }
    if (event.type === 'removed') {
      for (const name of this.imageNames) {
        if (name === event.file.response.data.name) {
          this.imageNames.splice(this.imageNames.indexOf(name), 1);
        }
      }
      willUpdate = true;
    }
    if (willUpdate) {
      if (this.mode === 'multi') {
        this.propagateChange(this.imageNames);
      } else {
        this.propagateChange(this.imageNames[0] || null);
      }
    }
  }

  onPreviewImage = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

}
