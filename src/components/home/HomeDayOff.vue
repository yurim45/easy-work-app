<template>
  <main>
    <h3>남은연차</h3>
    <strong>{{ me.dayOff }}일</strong>
    <ul class="annualList">
      <li>
        <button class="annual" @click="goToApply('morningAnnual')">
          <img alt="오전반차" src="@/assets/images/morningAnnual.png" />
        </button>
      </li>
      <li>
        <button class="annual" @click="goToApply('afternoonAnnual')">
          <img alt="오후반차" src="@/assets/images/afternoonAnnual.png" />
        </button>
      </li>
      <li>
        <button class="annual" @click="goToApply('annual')">
          <img alt="연차" src="@/assets/images/annual.png" />
        </button>
      </li>
    </ul>
    <ul class="annualList specialVacation">
      <h3>특별휴가</h3>
      <li v-if="me.specialVacation.special">
        <button class="annual" @click="goToApply('special')">
          <img alt="연말정산 특별휴가" src="@/assets/images/annual.png" />
        </button>
      </li>
      <li v-if="me.specialVacation.summer">
        <button class="annual" @click="goToApply('summer')">
          <img alt="여름휴가" src="@/assets/images/summer.png" />
        </button>
      </li>
      <li v-if="me.specialVacation.alone">
        <button class="annual" @click="goToApply('alone')">
          <img alt="멍떠 혼떠" src="@/assets/images/alone.png" />
        </button>
      </li>
      <li v-if="me.specialVacation.apple">
        <button class="annual" @click="goToApply('apple')">
          <img alt="apple" src="@/assets/images/annual.png" />
        </button>
      </li>
    </ul>
  </main>
</template>

<script>
import { MY_INFO } from '@/constants';

export default {
  name: 'HomeDayOff',
  data() {
    return {
      me: MY_INFO,
    };
  },
  methods: {
    goToApply(value) {
      this.$router.push({ name: 'AuunalApply', params: { value } });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  padding: 45px 25px;
  background: #fafafa;

  h3 {
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
  }

  strong {
    display: inline-block;
    margin: 8px auto 30px;
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    text-decoration-line: underline;
  }
}

.annualList {
  li {
    padding: 6px 0;
  }

  img {
    width: 100%;
    max-width: 200px;
  }
}

.specialVacation {
  margin-top: 30px;

  h3 {
    margin-bottom: 10px;
  }
}
</style>
