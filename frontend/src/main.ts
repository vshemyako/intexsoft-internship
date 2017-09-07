import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/module/app.module';
import {environment} from './environments/environment';

if (environment.production) {
    enableProdMode();
}

/**
 * The main purpose of this file is to specify what module is a root module and therefore what module will be
 * bootsrapped first
 */
platformBrowserDynamic().bootstrapModule(AppModule);
