import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FirebaseAuthResponse, User} from "../../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {tap, catchError} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthorizationService {

    public error$: Subject<string> = new Subject<string>()

    constructor(private http: HttpClient) {}

    get token (): string | null{
        let exp!: any;
        if(localStorage.getItem("fb-token-exp") !== null && localStorage.getItem("fb-token-exp") !== undefined) {
            exp = localStorage.getItem("fb-token-exp");
        } else {
            exp = 0;
        }
        const expDate = new Date(exp);
        if(new Date() > expDate) {
            this.logout();
            return null;
        }
        return localStorage.getItem("fb-token");
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            )
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;

        switch (message) {
            case "INVALID_EMAIL":
                this.error$.next("Невірний email");
                break;
            case "INVALID_PASSWORD":
                this.error$.next("Невірний пароль");
                break;
            case "EMAIL_NOT_FOUND":
                this.error$.next("Email не знайдено");
                break;
        }

        return throwError(error);
    }

    private setToken(response: FirebaseAuthResponse | any | null) {
        if(response) {
            const expDate = new Date(Date.now() + +response.expiresIn * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else {
            localStorage.clear()
        }
    }
}
