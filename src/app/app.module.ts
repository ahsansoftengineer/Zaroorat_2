import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OauthInterceptor } from './shared/middleware/oauth.interceptor';

import { AppComponent } from './app.component';
import { UserService } from './shared/service/user.service';
import { GroupsModule } from './components/groups/groups.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    GroupsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: OauthInterceptor, multi: true },
    UserService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
