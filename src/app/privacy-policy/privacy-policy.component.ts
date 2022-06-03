import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import {selectSettings} from '../shared/state/selectors/shared.selectors';
import {filter} from 'rxjs';
import {getSettings} from '../shared/state/actions/shared.actions';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {

  privacyPolicy = null;

  constructor(private store: Store, private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getAboutDetails();
  }

  getAboutDetails() {
    this.store.select(selectSettings).pipe(filter(help => !!help)).subscribe((data: any) => {
      this.privacyPolicy = this.domSanitizer.sanitize(SecurityContext.HTML, data.privacyNotice);
    });
    this.store.dispatch(getSettings());
  }

  ngOnDestroy() {
    console.log('bye');
  }

}
