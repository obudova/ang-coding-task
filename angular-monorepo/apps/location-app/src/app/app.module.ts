import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { EntitiesFeatureHomepageModule } from '@angular-monorepo/entities/feature-homepage';
import {
  EntityService,
  EntityServiceInterface,
  MockEntityService,
} from '@angular-monorepo/entities/data-repository';
import { USE_MOCK_SERVICE } from '../../service-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';

export function entityServiceFactory(): EntityServiceInterface {
  return USE_MOCK_SERVICE ? new MockEntityService() : new EntityService();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AvatarModule,
    PanelMenuModule,
    BadgeModule,
    AvatarGroupModule,
    EntitiesFeatureHomepageModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      bindToComponentInputs: true,
    }),
    ToastModule,
    SidebarModule,
  ],
  providers: [
    {
      provide: 'ENTITY_SERVICE',
      useFactory: entityServiceFactory,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
