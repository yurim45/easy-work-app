<template>
  <section>
    <div class="head">
      <button-view label="<" @onClick="clickPrevButton" />
      <h3 class="subtitle">{{ year }}년 {{ month }}월</h3>
      <button-view label=">" @onClick="clickNextButton" />
    </div>
    <table class="calneder">
      <thead>
        <th v-for="(day, i) in days" :key="i">{{ day }}</th>
      </thead>
      <tbody>
        <tr v-for="(date, idx) in dates" :key="idx">
          <td
            class="day"
            :class="{ today: isToday(day) }"
            v-for="(day, subIdx) in date"
            :key="subIdx"
          >
            {{ day }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import ButtonView from '@/components/common/ButtonView.vue';
export default {
  components: { ButtonView },
  name: 'CalenderView',
  data() {
    return {
      days: ['일', '월', '화', '수', '목', '금', '토'],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      dates: [],
      today: new Date().getDate(),
    };
  },
  mounted() {
    this.calenderData();
  },
  watch: {
    month() {
      this.calenderData();
    },
  },
  computed: {
    isToday() {
      return (day) =>
        this.today === day &&
        this.month === new Date().getMonth() + 1 &&
        this.year === new Date().getFullYear();
    },
  },
  methods: {
    calenderData() {
      const [firstDay, lastDate, prevLastDate] = this.getFirstDayLastDate(
        this.year,
        this.month
      );
      this.dates = this.getMonthOfDays(firstDay, lastDate, prevLastDate);
    },
    getFirstDayLastDate(year, month) {
      const firstDay = new Date(year, month - 1, 1).getDay(); // 이번 달의 시작 요일
      const lastDate = new Date(year, month, 0).getDate(); // 이번 달 마지막 날짜
      let lastYear = year;
      let lastMonth = month - 1;
      if (month === 1) {
        lastMonth = 12;
        lastYear -= 1;
      }
      const prevLastDate = new Date(lastYear, lastMonth, 0).getDate(); // 지난 달 마지막 날짜
      return [firstDay, lastDate, prevLastDate];
    },
    getMonthOfDays(firstDay, lastDate, prevLastDate) {
      let day = 1;
      let prevDay = prevLastDate - firstDay + 1;
      const dates = [];
      let weekOfDays = [];
      while (day <= lastDate) {
        if (day === 1) {
          for (let i = 0; i < firstDay; i++) {
            weekOfDays.push(prevDay);
            prevDay++;
          }
        }
        weekOfDays.push(day);
        if (weekOfDays.length === 7) {
          dates.push(weekOfDays);
          weekOfDays = [];
        }
        day += 1;
      }
      // 마지막 주 계산
      if (weekOfDays.length > 0 && weekOfDays.length < 7) {
        for (let j = 1; j <= 7 - weekOfDays.length; j++) {
          weekOfDays.push(j);
        }
      }
      if (weekOfDays.length > 0) {
        dates.push(weekOfDays);
      }
      return dates;
    },
    clickPrevButton() {
      this.month--;
      if (this.month === 0) {
        this.month = 12;
        this.year -= 1;
      }
    },
    clickNextButton() {
      this.month++;
      if (this.month === 13) {
        this.month = 1;
        this.year += 1;
      }
    },
  },
};
</script>

<style scoped lang="scss">
section {
  padding: 0 10px;
}

.head {
  @include flex;

  button {
    width: 20px;
    height: 20px;
    padding-bottom: 4px;
    font-weight: 700;
    border-radius: 4px;
  }
}

.subtitle {
  margin: 20px;
  color: var(--text-333);
  font-size: 18px;
  text-align: center;
}

.calneder {
  width: 100%;

  th {
    padding: 10px 0;
    color: var(--text-777);
    font-weight: 400;
    border-bottom: 5px solid var(--secondary);
  }
}

.day {
  height: 100px;
  font-size: 12px;
  text-align: right;
  border: 2px solid var(--secondary);
}

.today {
  background: var(--secondary);
  color: var(--primary);
  font-weight: 600;
}
</style>
