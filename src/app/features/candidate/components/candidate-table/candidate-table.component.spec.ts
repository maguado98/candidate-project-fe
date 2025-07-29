import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';

import { CandidateTableComponent } from './candidate-table.component';
import { CandidateService } from '../../../../core/services/candidate.service';

describe('CandidateTableComponent', () => {
  let fixture: ComponentFixture<CandidateTableComponent>;
  let component: CandidateTableComponent;

  const mockList = [
    { name: 'Martin', surname: 'Aguado', seniority: 'junior', years: 3, availability: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateTableComponent],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatTableModule
      ],
      providers: [
        { provide: CandidateService, useValue: { list$: of(mockList) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render one row with data', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr[mat-row]');
    expect(rows.length).toBe(1, 'expected exactly one data row');
    expect(rows[0].textContent).toContain('Martin');
    expect(rows[0].textContent).toContain('Aguado');
  });
});
