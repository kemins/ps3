import { NgModule, ApplicationRef } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import { CoreModule, AppEffectService } from './core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications';
import { HMRModule } from './hmr';
import { Store } from '@ngrx/store';
import { FooterBarModule } from './footer-bar';
import { AppStore } from './app.state';
import { GuestBoardModule } from './guest-board';
import { UserBoardModule } from './user-board';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { SideBarEffectService } from './side-bar/src/SideBarEffectService';
import { ContactEffectService } from './contact';
import { NotificationsEffectService } from './notifications/src/notifications-effect.service';
import { SlidesEffectService } from './slides/src/SlidesEffectService';
import { ProfileEffectService } from './profile/src/ProfileEffectService';
import { SocialLoginEffectService } from './social-login/src/social-login-effect.service';
import { AvatarEffectService } from './profile/src/AvatarEffectService';
import { NewAlbumEffectService } from './albums';
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
    bootstrap: [App],
    declarations: [App],
    imports: [
        MaterialModule.forRoot(),
        AlertModule.forRoot(),
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(ROUTES, {useHash: true}),
        CoreModule,
        NotificationsModule,
        GuestBoardModule,
        UserBoardModule,
        FooterBarModule,
        AppService.provideStore(),
        StoreDevtoolsModule,
        EffectsModule.runAfterBootstrap(AppEffectService),
        EffectsModule.run(SideBarEffectService),
        EffectsModule.run(ContactEffectService),
        EffectsModule.run(NotificationsEffectService),
        EffectsModule.run(SlidesEffectService),
        EffectsModule.run(ProfileEffectService),
        EffectsModule.run(NewAlbumEffectService),
        EffectsModule.run(AvatarEffectService),
        EffectsModule.run(SocialLoginEffectService),
        StoreDevtoolsModule.instrumentOnlyWithExtension()
    ],
    providers: [
        AppService
    ]
})
export class AppModule extends HMRModule {
    constructor(appRef: ApplicationRef, appStore: Store<AppStore>) {
        super(appRef, appStore);
    }
}
