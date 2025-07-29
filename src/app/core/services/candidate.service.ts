import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate } from '../../models/candidate';
import { HttpClient } from '@angular/common/http';

const STORAGE_KEY = 'candidates';

@Injectable({ providedIn: 'root' })
export class CandidateService {
    private listSubject = new BehaviorSubject<Candidate[]>(this.load());
    readonly list$: Observable<Candidate[]> = this.listSubject.asObservable();

    constructor(private http: HttpClient) {}

    private load(): Candidate[] {
        const candidates_data = localStorage.getItem(STORAGE_KEY);
        return candidates_data ? JSON.parse(candidates_data) : [];
    }

    private save(list: Candidate[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        this.listSubject.next(list);
    }

    addAll(newOnes: Candidate[]) {
        this.save([...this.listSubject.value, ...newOnes]);
    }

    clear() {
        this.save([]);
    }

    upload(file: File) {
        const fd = new FormData();
        fd.append('file', file, file.name);
        // Debe ser exactamente así:
        return this.http.post<Candidate[]>(
            'http://localhost:3000/candidates/upload',
            fd
        );
    }
}
