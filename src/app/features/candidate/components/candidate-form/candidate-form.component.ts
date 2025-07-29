import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { CandidateService } from '../../../../core/services/candidate.service';
import { Candidate } from '../../../../models/candidate';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent {
  @Output() uploaded = new EventEmitter<Candidate[]>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[^0-9]*$')]],
    surname: ['', [Validators.required, Validators.pattern('^[^0-9]*$')]],
    file: [null as File | null, Validators.required],
  });

  isLoading = false;
  selectedFileName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cs: CandidateService
  ) { }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0] || null;
    this.form.patchValue({ file });
    this.selectedFileName = file ? file.name : null;
  }

  submit() {
    console.log('submit fired', this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const file = this.form.get('file')!.value as File;
    if (!file.name.toLowerCase().endsWith('.xlsx')) {
      alert('Please select an .xlsx file');
      return;
    }

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('name', this.form.get('name')!.value ?? '');
    fd.append('surname', this.form.get('surname')!.value ?? '');

    this.isLoading = true;
    this.http
      .post<Candidate[]>('http://localhost:3000/candidates/upload', fd)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (cands) => {
          this.cs.addAll(cands);
          this.uploaded.emit(cands);
          this.form.reset();
          this.selectedFileName = null;
        },
        (err) => {
          console.error(err);
          alert('Upload failed');
        }
      );
  }
}
