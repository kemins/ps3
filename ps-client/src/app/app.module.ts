import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, ConnectionBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import {OneAllAPI} from './social-login/oneall.ts';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { MdModule } from './md.module';
import { ValidatorModule } from './validators';
import { CoreModule } from './core';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState } from './app.service';
import { Home } from './home';
import { ContactComponent } from './contact';
import { NoContent } from './no-content';
import { Carousel } from './carousel/carousel.component';
import { CarouselComponent, SlideComponent } from 'ng2-bootstrap';
import { PsHttp } from "./core/ps-http.service";
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ReCaptchaModule } from 'angular2-recaptcha';


// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState,
    PsHttp
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [App],
    declarations: [
        App,
        ContactComponent,
        Home,
        NoContent,
        CarouselComponent,
        SlideComponent,
        Carousel
    ],
    imports: [
        MdModule.forRoot(),
        AlertModule,
        HttpModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(ROUTES, {useHash: true}),
        ReCaptchaModule,
        ValidatorModule,
        CoreModule
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS,
        ConnectionBackend
    ]
})
export class AppModule {
    constructor(public appRef:ApplicationRef, public appState:AppState) {
    }

    hmrOnInit(store) {
        if (!store || !store.state) return;
        console.log('HMR store', store);
        this.appState._state = store.state;
        this.appRef.tick();
        delete store.state;
    }

    hmrOnDestroy(store) {
        var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        var state = this.appState._state;
        store.state = state;
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}

OneAllAPI
    .getInstance()
    .bootstrap()
    .showLoginWidget();