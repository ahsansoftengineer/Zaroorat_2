import { Component, OnInit, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import {ToastService} from './toast-service';

@Component({
  selector: 'app-toasts',
  templateUrl:'./toasts.component.html',
  host: {'[class.ngb-toasts]': 'true'},
  // styleUrls: ['./toasts.component.scss'],
 
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
