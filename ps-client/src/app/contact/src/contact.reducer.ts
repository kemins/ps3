import { Action } from '@ngrx/store';

import { AppActions } from '../../app.actions';
import { Contact } from './contact.model';


export const contact = (contact:Contact, action:Action) => {
    let result:Contact;

    switch (action.type) {
        case AppActions.SET_CONTACT:
            result = Object.assign({}, action.payload);
            break;

        case AppActions.MESSAGE_POST_SUCCESS:
            result = new Contact();
            break;

        default:
            result = contact;
            break;
    }

    return result;
};