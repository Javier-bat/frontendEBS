import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ReportesService } from 'src/app/servicio/reportes.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chart-clientes',
  templateUrl: './chart-clientes.component.html',
  styleUrls: ['./chart-clientes.component.css']
})

export class ChartClientesComponent {
  public seleccionado: boolean = false;
  public opcionSeleccionado = new FormControl('');
  public periodoForm = this.formBuilder.group({
    desde: '',
    hasta: ''
  });;
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      public barChartLabels: string[] = [];
      public barChartType: ChartType = 'bar';
      public barChartLegend = true;
      public cantidadPedidos: number[] = [];
      public barChartData = [
        {data: this.cantidadPedidos, label: 'Cantidad de Clientes'}
      ];
    
      constructor(private reportesService: ReportesService,private formBuilder: FormBuilder) { 
      }

      ngOnInit(): void {
        this.reportesService.getClientesPorPeriodo({desde:'',hasta:''}).subscribe(data => {
          
          this.barChartData[0].data = []
          this.barChartLabels = []
          let array = Object.values(data)
            array.forEach((valor,indice) =>{
                let fecha = new Date(valor.createdAt);
                let fechaString = (fecha.getDay()+1) + "/" + (fecha.getMonth()+1) + "/" + (fecha.getFullYear());

                this.barChartLabels.push((valor.createdAt).substring(0,10))
                this.barChartData[0].data.push(valor.clientes)
            })
        })
      }

      seleccionarPeriodo(){
        if(this.opcionSeleccionado.value == "historico"){
          this.seleccionado = false
          this.ngOnInit()
        } else {
          this.seleccionado = true
        }
      }

      buscarPorPeriodo(){
        let inputs =  this.periodoForm.getRawValue()
        this.reportesService.getClientesPorPeriodo(inputs).subscribe(data => {
          this.barChartData[0].data = []
          this.barChartLabels = []
          let array = Object.values(data)
            array.forEach((valor,indice) =>{
              let fecha = new Date(valor.createdAt);
              let fechaString = (fecha.getDay()+1) + "/" + (fecha.getMonth()+1) + "/" + (fecha.getFullYear());

              this.barChartLabels.push((valor.createdAt).substring(0,10))
                this.barChartData[0].data.push(valor.clientes)
            })
        })
      }
}