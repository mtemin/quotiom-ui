import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideOptimus } from '@openng/optimus-ui/config';
import { provideStore } from '@ngrx/store';
import Aura from '@openng/optimus-ui-themes/aura';
import Material from '@openng/optimus-ui-themes/material';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(),
    provideOptimus({
          theme: {
              preset: Aura
          }
      }
    )
  ],
};
