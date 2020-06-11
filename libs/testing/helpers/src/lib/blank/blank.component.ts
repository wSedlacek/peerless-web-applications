import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'peerless-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css'],
})
export class BlankComponent implements OnInit {
  constructor() {}

  @Override()
  public ngOnInit(): void {}
}
