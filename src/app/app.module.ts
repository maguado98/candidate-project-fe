// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule }             from '@angular/material/icon';

import { AppComponent } from './app.component';
import { CandidateFormComponent } from './features/candidate/components/candidate-form/candidate-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateTableComponent } from './features/candidate/components/candidate-table/candidate-table.component';
@NgModule({
    declarations: [
        AppComponent,
        CandidateFormComponent,
        CandidateTableComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
