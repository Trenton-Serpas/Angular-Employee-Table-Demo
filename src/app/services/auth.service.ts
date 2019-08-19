import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthenticated: boolean;

    constructor(private router: Router) {
        this.isAuthenticated = false;
    }

    // is called on attempting to navigate to login required pages
    canActivate() {
        if (this.isAuthenticated) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
