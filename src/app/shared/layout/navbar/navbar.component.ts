import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Location, PopStateEvent} from '@angular/common';
import {Store} from '@ngrx/store';
import {selectPuidDetails} from '../../../store/selectors/global.selectors';
import {filter} from 'rxjs';
import {getPuidDetails} from '../../../store/actions/global.actions';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    puidDetails = null;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    constructor(private store: Store, private router: Router, private location: Location, private ngxService: NgxUiLoaderService) {
    }

    getPuidDetails() {
        if (!this.puidDetails) {
            this.ngxService.start('puidDetails');
        }
        this.store.select(selectPuidDetails).pipe(filter(help => !!help)).subscribe((data: any) => {
            this.puidDetails = data;
            this.ngxService.stop('puidDetails');
            console.log(this.puidDetails);
        });
        this.store.dispatch(getPuidDetails({
            data: {
                permalink: 'vishal-fund'
            }
        }));
    }

    ngOnInit() {
        this.getPuidDetails();
        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl) {
                    this.yScrollStack.push(window.scrollY);
                }
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
    }

    isHome() {
        const title = this.location.prepareExternalUrl(this.location.path());

        if (title === '#/landing') {
            return true;
        } else {
            return false;
        }
    }

    isDocumentation() {
        const title = this.location.prepareExternalUrl(this.location.path());
        if (title === '#/documentation') {
            return true;
        } else {
            return false;
        }
    }
}
