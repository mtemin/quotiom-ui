import {Component, Inject, Input, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NavbarComponent} from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    // NavbarComponent,
    RouterLink

  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  url:string='';
  constructor(private router: Router, private route: ActivatedRoute,@Inject(PLATFORM_ID) private platformId: string) {

  }
  ngOnInit(): void {
    if (this.platformId === 'browser') {
      this.url = window.location.href;
    } else {
      // handle server-side rendering case
      this.url = this.route.snapshot.url.join('/');
    }
  }
}
