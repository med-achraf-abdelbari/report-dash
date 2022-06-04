import {Component, OnInit, SecurityContext} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import {filter} from 'rxjs';
import {selectPuidDetails} from '../store/selectors/global.selectors';
import {getPuidDetails} from '../store/actions/global.actions';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
    focus: any;
    focus1: any;
    puidDetails = null;

    constructor(private store: Store, private domSanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.getPuidDetails();
    }

    getPuidDetails() {
        this.store.select(selectPuidDetails).pipe(filter(help => !!help)).subscribe((data: any) => {
            this.puidDetails = data;
        });
        this.store.dispatch(getPuidDetails({
            data : {
                permalink : 'vishal-fund'
            }
        }));
    }

}
