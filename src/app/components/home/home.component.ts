import {Component, OnInit} from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {GlobalDataSummary} from '../../models/globalData';
import {GoogleChartComponent, GoogleChartInterface} from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  };

  constructor(private dataService: DataServiceService) {
  }

  initChart() {
    const datatable = [];
    datatable.push(['Country', 'Cases']);
    this.globalData.forEach(cs => {
      datatable.push([
        cs.country, cs.confirmed
        ]);
    });

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      options: {height: 500}
    };

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      options: {height: 500}
    };
  }


  ngOnInit(): void {
    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            console.log(result);
            this.globalData = result;
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active;
                this.totalConfirmed += cs.confirmed;
                this.totalDeaths += cs.deaths;
                this.totalRecovered += cs.recovered;
              }
            });

            this.initChart();
          }
        }
      );
  }

}
