import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

export function baseURLInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const reqWithBaseURL = req.clone({ url: environment.baseURL + req.url});
  return next(reqWithBaseURL);
}
