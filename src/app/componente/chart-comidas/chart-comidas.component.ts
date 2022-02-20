import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ReportesService } from 'src/app/servicio/reportes.service';

@Component({
  selector: 'app-chart-comidas',
  templateUrl: './chart-comidas.component.html',
  styleUrls: ['./chart-comidas.component.css']
})

export class ChartComidasComponent {
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      public barChartLabels: string[] = [];
      public barChartType: ChartType = 'bar';
      public barChartLegend = false;
      public cantidadPedidos: number[] = [];
      public barChartData = [
        {data: this.cantidadPedidos, label: 'Cantidad de pedidos'}
      ];
    
      constructor(private reportesService: ReportesService) { 
          this.reportesService.getComidasMasPedidas().subscribe(data => {
            let array = Object.values(data)
            array.forEach((valor,indice) =>{
                this.barChartLabels.push(valor.denominacion)
                this.barChartData[0].data.push(valor.total)
            })

          })
      }
    
      ngOnInit(): void {
      }
    
      
  
}