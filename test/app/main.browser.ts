import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone.js';
import 'reflect-metadata';
import {NgModule} from '@angular/core';
import 'rxjs/Rx';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpModule} from '@angular/http';
import {App} from './app';
// NOTE: prototype for the ES7 Reflect API. Added for easier manipulating with metadata.
/// <reference path="../../../node_modules/angular2/typings/browser.d.ts" />
// Add all operators to Observable
// import {enableProdMode} from '@angular/core';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, HttpModule],
  bootstrap: [App]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
