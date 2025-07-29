import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Candidate } from '../../../../models/candidate';
import { CandidateService } from '../../../../core/services/candidate.service';

@Component({
  selector: 'app-candidate-table',
  templateUrl: './candidate-table.component.html',
  styleUrls: ['./candidate-table.component.scss']
})
export class CandidateTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'seniority', 'years', 'availability'];
  dataSource = new MatTableDataSource<Candidate>([]);

  constructor(private cs: CandidateService) { }

  ngOnInit(): void {
    this.cs.list$.subscribe(list => {
      this.dataSource.data = list;
    });
  }
}
