import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthorizationService} from "../admin/shared/services/authorization.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthorizationService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.auth.isAuthenticated()) {
            req = req.clone({
                setParams: {
                    auth: (this.auth.token as string)
                }
            })
        }
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log("[Interceptor Error]: ", error);
                    if(error.status === 401) {
                        this.auth.logout();
                        this.router.navigate(["/admin", "login"], {
                            queryParams: {
                                authFailed: true
                            }
                        })
                    }
                    return throwError(error)
                })
            )
    }

}
