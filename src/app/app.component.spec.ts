import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA }         from '@angular/core';
import { AppComponent }             from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture   = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render toolbar with title', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('mat-toolbar')?.textContent).toContain('Candidate Uploader');
  });
});