import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { SessionStorageService } from '../../../node_modules/angular-web-storage';
import { NavServiceService } from '../services/nav-service.service';
import { SessionCryptoService } from '../services/session-crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, 
              private router: Router,
              private firebaseService: FirebaseService,
              private session: SessionStorageService,
              private nav: NavServiceService,
              private cryptoservice: SessionCryptoService){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
      return new Promise((resolve) => {
        var that=this;
          this.afAuth.authState.subscribe((succ)=> {
            if(succ != null) { 
              that.firebaseService.setCompany( that.cryptoservice.getPlainText(that.session.get('companyNameTruckLocator'), 'kajovKlucNaSeesionPreTruckLocator'));
              that.nav.show();
              resolve(true); 
            }
            else{
              console.log("access denied");
              this.router.navigateByUrl('/login');
              resolve(false);
            }
          });
        });
    }
}
