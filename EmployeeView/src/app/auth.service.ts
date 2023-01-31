export class AuthService {
    loggedIn: boolean = false;

    login(){
        this.loggedIn = true;
        console.log(this.isAuthenticated());
        
    }

    logout(){
        this.loggedIn = false;
        console.log(this.isAuthenticated());
    }

    isAuthenticated(){
        return this.loggedIn;
    }
    
}