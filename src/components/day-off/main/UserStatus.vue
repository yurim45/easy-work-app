<template>
  <section class="section">
    <h3>연차휴가</h3>
    <p>나의 잔여 연차</p>
    <strong>8.5개</strong>
    <ul class="annualList">
      <li>
        <button class="annual" @click="goToApply('annual')">
          <icon-annual /><span>연차</span>
        </button>
      </li>
      <li>
        <button class="annual" @click="goToApply('morningAnnual')">
          <icon-morning-annual /> <span>오전반차</span>
        </button>
      </li>
      <li>
        <button class="annual" @click="goToApply('afternoonAnnual')">
          <icon-afternoon-annual /><span>오후반차</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import {
  IconAnnual,
  IconMorningAnnual,
  IconAfternoonAnnual,
} from '../icons/annual/index';

export default {
  name: 'UserStatus',
  components: { IconAnnual, IconMorningAnnual, IconAfternoonAnnual },
  data() {
    return {};
  },
  methods: {
    goToApply(value) {
      this.$router.push({ name: 'AuunalApply', params: { value } });
    },
  },
};
</script>

<style scoped lang="scss">
.section {
  @include stFormBox;

  p {
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: -1px;
  }

  strong {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: -0.6px;
  }
}

.annualList {
  @include flex(space-between);
  margin-top: 24px;

  li {
    width: 100%;
    margin-right: 8px;
  }

  :last-child {
    margin-right: 0;
  }
}

.annual {
  @include flex;
  width: 100%;
  height: 32px;
  background: #e7effc;
  color: var(--text-blue);
  font-size: 14px;
  border-radius: 5px;

  span {
    margin-left: 4px;
  }
}
</style>
