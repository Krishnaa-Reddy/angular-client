import { NgClass, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  computed,
  input,
  signal
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { colors, levels } from '../../../../constants/levels.constant';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective, NgClass],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  ///////TODO: Bring in as much reactivity as you can
  //// Here, I have too many input tags reduce it & optimize it.
  /// TODO: Try to separate out the html into chunks of reusable components
  title = input('Overall Progress');
  titleSizeClass = input('text-xl');
  fontSizeClass = input('text-xs');

  top = input('top-[26px]');
  left = input('left-[38px]');
  aspectRatio = input(1);
  width = input(80);

  isBrowser!: boolean;
  done = 2;
  total = input<number>(99);
  data = signal<number[]>([324, 34, 345]);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public doughnutChartLabels: string[] = levels;

  public doughnutChartDatasets$ = computed(() => {
    return [
      {
        data: this.data(),
        backgroundColor: colors,
      },
    ] as ChartConfiguration<'doughnut'>['data']['datasets'];
  });

  public doughnutChartOptions = computed(() => {
    return {
      responsive: false,
      aspectRatio: this.aspectRatio(),
      plugins: {
        legend: {
          display: false,
        },
      },
    } as ChartConfiguration<'doughnut'>['options'];
  });
}

