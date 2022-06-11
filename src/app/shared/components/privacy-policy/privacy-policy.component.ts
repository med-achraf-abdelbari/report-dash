import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import {selectSettings} from '../../store/selectors/shared.selectors';
import {filter, map} from 'rxjs';
import {getSettings} from '../../store/actions/shared.actions';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {

  privacyPolicy = null;

  constructor(private store: Store, private domSanitizer: DomSanitizer, private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
    this.getAboutDetails();
  }

  getAboutDetails() {
    this.store.select(selectSettings).pipe(map(data => {
      if (!data) {
        this.ngxService.start('privacyPolicy');
      }
      return data;
    })).pipe(filter(help => !!help)).subscribe((data: any) => {
      this.privacyPolicy = this.domSanitizer.sanitize(SecurityContext.HTML, data.privacyNotice);
      this.ngxService.stop('privacyPolicy');
    });
    this.store.dispatch(getSettings());
  }

  ngOnDestroy() {
    console.log('bye');
  }

}
