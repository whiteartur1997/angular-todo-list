// in the main.ts file
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {baseURLInterceptor} from "./app/core/api/services/baseURLInterceptor";

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(
    withFetch(),
    withInterceptors([baseURLInterceptor])
  )]
});
