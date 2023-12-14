import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EntityServiceInterface } from '@angular-monorepo/entities/data-repository';
import { EmployeeVisits, LocationStats } from '../../../../data-repository/src/lib/model/model';

@Component({
  selector: 'angular-monorepo-location-dashboard',
  templateUrl: './location-dashboard.component.html',
  styleUrls: ['./location-dashboard.component.scss'],
})
export class LocationDashboardComponent {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @ViewChild('chartEmployee') chartEmployee!: ElementRef;

  constructor(@Inject('ENTITY_SERVICE') private entityService: EntityServiceInterface) {
    this.entityService.getLocationStats().subscribe((val) => {
      this.drawLocationVisits(val.lastWeekLocationOccupancy);
      this.drawEmployeeVisitsChart(val.lastWeekEmployeesVisits);
    })
  }

  drawEmployeeVisitsChart(employeeVisits: EmployeeVisits[]) {
    Highcharts.chart(this.chartEmployee.nativeElement, {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Last week visits per employee',
        align: 'left'
      },
      xAxis: {
        categories: employeeVisits.map((employee)=> employee.name),
        crosshair: true,
        accessibility: {
          description: 'Countries'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount of Visits'
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          type: 'column',
          name: 'Employee',
          data: employeeVisits.map(employee => employee.visits)
        },
      ]
    });
  }

  drawLocationVisits(locationVisits: number[]) {
    // Create the chart
    Highcharts.chart(this.chartContainer.nativeElement, {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Weekday Data - Location Occupation'
      },
      xAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      yAxis: {
        title: {
          text: 'Value'
        },
      },
      series: [{
        name: 'Location 1',
        type: 'line',
        data: locationVisits
      }]
    });
  }

}
