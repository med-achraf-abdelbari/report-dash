import {Component, ElementRef, HostListener, Inject, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DOCUMENT, Location} from '@angular/common';
import {filter, Subscription} from 'rxjs';
import {ParseHttpClientService} from './shared/services/http-client/parse-http-client.service';
import {SettingsService} from './shared/services/settings/settings.service';
import {Store} from '@ngrx/store';
import {getSettings} from './shared/store/actions/shared.actions';

let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navbarHeight = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;

    constructor(private renderer: Renderer2,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                @Inject(DOCUMENT) private document: any,
                private element: ElementRef,
                public location: Location,
                private parseClient: ParseHttpClientService,
                private store: Store
    ) {
    }

    @HostListener('window:scroll', ['$event'])
    hasScrolled() {

        const st = window.pageYOffset;
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }

        const navbar = document.getElementsByTagName('nav')[0];

        // If they scrolled down and are past the navbar, add class .headroom--unpinned.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            if (navbar.classList.contains('headroom--pinned')) {
                navbar.classList.remove('headroom--pinned');
                navbar.classList.add('headroom--unpinned');
            }
            // $('.navbar.headroom--pinned').removeClass('headroom--pinned').addClass('headroom--unpinned');
        } else {
            // Scroll Up
            //  $(window).height()
            if (st + window.innerHeight < document.body.scrollHeight) {
                // $('.navbar.headroom--unpinned').removeClass('headroom--unpinned').addClass('headroom--pinned');
                if (navbar.classList.contains('headroom--unpinned')) {
                    navbar.classList.remove('headroom--unpinned');
                    navbar.classList.add('headroom--pinned');
                }
            }
        }

        lastScrollTop = st;
    }

    isReport = false;

    ngOnInit() {
        // tslint:disable-next-line:prefer-const
        const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.renderer.listen('window', 'scroll', () => {
                const number = window.scrollY;
                if (number > 150 || window.pageYOffset > 150) {
                    // add logic
                    navbar.classList.add('headroom--not-top');
                } else {
                    // remove logic
                    navbar.classList.remove('headroom--not-top');
                }
            });
        });
        setInterval(() =>{
            this.isReport = this.router.url.includes('report');
        }, 500);
        this.hasScrolled();
    }
}
