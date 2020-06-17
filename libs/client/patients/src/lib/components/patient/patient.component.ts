import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../state';

@Component({
  selector: 'peerless-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent {
  @Input() public patient?: Patient;
  @Output() public readonly remove = new EventEmitter<void>();
  @Output() public readonly edit = new EventEmitter<void>();
}
