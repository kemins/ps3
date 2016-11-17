import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ApplicationRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from '../../app.actions';
import { AppStore } from '../../app.state';

export class HMRModule {
    constructor(private appRef: ApplicationRef, private appStore: Store<AppStore>) {}

    hmrOnInit(store) {
        if (store && store.state) {
            this.appStore.dispatch({
                type: AppActions.HMR_RESTORE,
                payload: store.state
            });

            if ('restoreInputValues' in store) {
                store.restoreInputValues();
            }
            // change detection
            this.appRef.tick();
            delete store.state;
            delete store.restoreInputValues;
        }
    }

    hmrOnDestroy(store) {
        var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        ///store.restoreInputValues  = createInputTransfer();
        // remove styles
        removeNgStyles();

        this.appStore
            .first()
            .subscribe( snapshot => store.state = snapshot);
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    }
}