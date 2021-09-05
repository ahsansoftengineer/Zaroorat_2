import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  constructor( private toastr: ToastrService) { }
  successmessage(title, message) {
    this.toastr.success(message, title, { positionClass: 'toast-bottom-right' });
  }

  errormessage(title, message) {
    this.toastr.error(message, title, { positionClass: 'toast-bottom-right' });
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
    
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
