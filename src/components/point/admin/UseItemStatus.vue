<template>
  <accordion-view title="항목별 사용내역"
    ><section>
      <div>
        <Bar
          chart-id="useItem"
          :chart-options="chartOptions"
          :chart-data="chartData"
          :width="400"
          :height="300"
        />
      </div>
    </section>
  </accordion-view>
</template>

<script>
import AccordionView from '@/components/common/AccordionView.vue';
import { Bar } from 'vue-chartjs';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

export default {
  name: 'UseItemStatus',
  components: { AccordionView, Bar },
  data() {
    return {
      chartData: {
        labels: ['식대초과', '식음료', '문화', '물품'],
        datasets: [
          {
            label: '항목별 사용내역',
            data: [40, 20, 6, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          datalabel: {
            display: false,
          },
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
section {
  padding: 20px;
}
</style>
