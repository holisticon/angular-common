import {App} from '../app/app';
import {async, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';


TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('app', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        App
      ]
    });
    TestBed.compileComponents();
  });

  it('should init app', async(() => {
    let app = TestBed.createComponent(App);
    expect(app).toBeDefined();
  }));
});
