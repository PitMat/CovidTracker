import {Component, Input, OnInit} from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {GlobalDataSummary} from '../../models/globalData';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalDeaths')
  totalDeaths;
  @Input('totalActive')
  totalActive;
  @Input('totalRecovered')
  totalRecovered;

  data: GlobalDataSummary[];
  countries: string[] = [];
  constructor(private service: DataServiceService) {
  }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
      this.countries.push(cs.country);
      });
    });
  }

  updateValues(country: string){
    console.log(country);
  }

}
