import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfg } from './app/app.config';

bootstrapApplication(AppComponent, appConfg).catch((err) => console.error(err));
