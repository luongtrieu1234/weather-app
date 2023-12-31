import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  @Output() searchLocationEvent: EventEmitter<any> = new EventEmitter();

  location: string = '';
  loading: boolean = false;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onLoading()
      .subscribe((value) => (this.loading = value));
  }

  searchLocation() {
    if (!this.location) {
      alert("Please enter city name !");
      return;
    }
    this.searchLocationEvent.emit(this.location);
    this.location = '';
  }

  /**
   * @param color
   */
  updateSearchBtnColor(color: string): void {
    document.getElementById('search-btn')!.style.backgroundColor = color;
  }

  ngOnInit(): void {}
}