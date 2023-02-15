import { of } from "rxjs";

export class AuthService {
    loggedIn: boolean = false;
    roleAs: string;

    login(value: string){
        this.roleAs = value;
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('ROLE', this.roleAs);
        return of({ success: this.loggedIn, role: this.roleAs });
    }

    logout(){
        this.loggedIn = false;
        this.roleAs = '';
        localStorage.setItem('STATE', 'false');
        localStorage.setItem('ROLE', '');
        return of({ success: this.loggedIn, role: '' });
    }

    isAuthenticated(){
        const loginState = localStorage.getItem('STATE');
        if (loginState == 'true')
          this.loggedIn = true;
        else
          this.loggedIn = false;
        return this.loggedIn;
    }

    getRole() {
        this.roleAs = localStorage.getItem('ROLE');
        return this.roleAs;
      }
    
}