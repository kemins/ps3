import {
  Component,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EmailValidator } from '../../validators';
import { AppSettings } from '../../core';
import { IContact } from './IContact';
import { ContactService } from './ContactService';
import * as contactStyles from './contact.styl';
import * as _ from 'lodash';

@Component({
  selector: 'ps-contact-us',
  styles: [contactStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html'
})
export class ContactComponent {
  private contact: Observable<IContact>;
  private dirtyContact: Observable<IContact>;
  private token: Observable<string>;
  private captchaKey = '';
  private contactForm;

  @ViewChild('captcha')
  public captcha;

  public ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.email])],
      message: ['', Validators.required]
    });

    this.dirtyContact
      .distinctUntilChanged((contact) => _.isEqual(contact, this.contactForm.value))
      .subscribe((contact) => this.contactForm.patchValue(contact));

    this.contactForm.valueChanges
      .subscribe((contact) => this.contactService.setDirtyContact(contact));
  }

  public constructor(private contactService: ContactService, private formBuilder: FormBuilder) {
    this.captchaKey = AppSettings.getSetting('captcha.key');
    this.contact = contactService.getContact();
    this.dirtyContact = contactService.getDirtyContact();
    this.token = contactService.getToken();
  }

  public onSubmit(): void {
    this.contactService.commitDirtyContact();
    this.contactService.sendMessage();
    this.captcha.reset();
    this.handleCorrectCaptcha(null);
  }

  public handleCorrectCaptcha(token): void {
    this.contactService.setToken(token);
  }
}

