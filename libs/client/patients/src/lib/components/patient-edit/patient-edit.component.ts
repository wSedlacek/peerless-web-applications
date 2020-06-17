import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Patient } from '../../state';

@Component({
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss'],
})
export class PatientEditComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private readonly ref: MatDialogRef<PatientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Patient
  ) {}

  public readonly form = this.fb.group({
    name: [this.data?.name ?? '', Validators.required],
  });

  @Override()
  public ngOnInit(): void {}

  public onNoClick(): void {
    this.ref.close();
  }
}
