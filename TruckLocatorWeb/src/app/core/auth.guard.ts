import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, 
              private router: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
      return new Promise((resolve) => {
          this.afAuth.authState.subscribe((succ)=> {
            if(succ != null) { resolve(true); }
            else{
              console.log("access denied");
              this.router.navigateByUrl('/login');
              resolve(false);
            }
          });
        });
    }
}
