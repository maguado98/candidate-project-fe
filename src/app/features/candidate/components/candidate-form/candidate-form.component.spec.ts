import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CandidateFormComponent } from './candidate-form.component';
import { CandidateService } from '../../../../core/services/candidate.service';

describe('CandidateFormComponent', () => {
  let fixture: ComponentFixture<CandidateFormComponent>;
  let component: CandidateFormComponent;
  let httpMock: HttpTestingController;
  let cs: CandidateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [CandidateService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateFormComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    cs = TestBed.inject(CandidateService);
    fixture.detectChanges();
  });

  it('should invalidate form if name contains digits', () => {
    component.form.controls['name'].setValue('Mart1n');
    expect(component.form.controls['name'].valid).toBeFalse();
  });

  it('should send POST and call service.addAll on valid submit', fakeAsync(() => {
    const fakeFile = new File([''], 'test.xlsx', { type: '' });
    component.form.controls['name'].setValue('Martin');
    component.form.controls['surname'].setValue('Aguado');
    component.form.patchValue({ file: fakeFile });
    fixture.detectChanges();

    const spy = spyOn(cs, 'addAll');
    component.submit();

    const req = httpMock.expectOne('http://localhost:3000/candidates/upload');
    expect(req.request.method).toBe('POST');
    req.flush([{ name: 'Martin', surname: 'Aguado', seniority: 'junior', years: 3, availability: true }]);
    tick();

    expect(spy).toHaveBeenCalledWith(jasmine.any(Array));
    httpMock.verify();
  }));
});
