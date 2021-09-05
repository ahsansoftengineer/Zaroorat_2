import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { ToggleFullscreenDirective } from './directives/fullscreen.directive';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavService } from './service/nav.service';
import { WINDOW_PROVIDERS } from './service/windows.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatbootComponent } from './components/chatboot/chatboot.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastsComponent } from './toasts/toasts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OauthInterceptor } from './middleware/oauth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ToastrModule } from 'ngx-toastr';
// import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    ToggleFullscreenDirective,
    FeatherIconsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    BreadcrumbComponent,
    RightSidebarComponent,
    ChatbootComponent,
    ContactsComponent,
    ToastsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(), // ToastrModule added
    UiSwitchModule
  ],
  providers: [NavService, WINDOW_PROVIDERS],
  exports: [
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    FormsModule,
    NgSelectModule,
    ToastrModule, // ToastrModule added
    NgxMaskModule,
    ReactiveFormsModule,
    ToastsComponent,
    UiSwitchModule
  ],
})
export class SharedModule {}
