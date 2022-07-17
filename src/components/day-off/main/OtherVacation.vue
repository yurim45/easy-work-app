<template>
  <section class="section">
    <h3>기타휴가</h3>
    <ul class="annualList">
      <li>
        <div class="title">
          <icon-congratulation-and-condolence /><strong>경조휴가</strong>
        </div>
        <button class="apply" @click="goToApply('cc')">신청</button>
      </li>
      <li>
        <div class="title"><icon-official /> <strong>공가</strong></div>
        <button class="apply" @click="goToApply('official')">신청</button>
      </li>
      <li>
        <div class="title"><icon-maternity /> <strong>출산휴가</strong></div>
        <button class="apply" @click="goToApply('maternity')">신청</button>
      </li>
      <li>
        <div class="title">
          <icon-paternity /><strong>배우자 출산휴가</strong>
        </div>
        <button class="apply" @click="goToApply('paternity')">신청</button>
      </li>
      <li>
        <div class="title"><icon-family /> <strong>가족 돌봄 휴가</strong></div>
        <button class="apply" @click="goToApply('family')">신청</button>
      </li>
      <li>
        <div class="title">
          <icon-physiological /> <strong>보건휴가</strong>
        </div>
        <button class="apply" @click="goToApply('physiological')">신청</button>
      </li>
    </ul>
  </section>
</template>

<script>
import {
  IconCongratulationAndCondolence,
  IconFamily,
  IconMaternity,
  IconOfficial,
  IconPaternity,
  IconPhysiological,
} from '../icons/other/index';

export default {
  name: 'OtherVacation',
  components: {
    IconCongratulationAndCondolence,
    IconFamily,
    IconMaternity,
    IconOfficial,
    IconPaternity,
    IconPhysiological,
  },
  methods: {
    goToApply(value) {
      this.$router.push({ name: 'AuunalApply', params: { value } });
    },
  },
};
</script>

, IconCCLeave
<style scoped lang="scss">
.section {
  @include stFormBox;
  margin-top: 12px;
}

.annualList {
  margin-top: 24px;

  li {
    @include flex(space-between);
    width: 100%;
    height: 48px;
    margin: 8px 0 24px;
  }

  :last-child {
    margin: 0;
  }
}

.title {
  @include flex;

  svg {
    margin-right: 16px;
  }

  strong {
    font-weight: 700;
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: -0.6px;
  }
}

.apply {
  width: 52px;
  height: 31px;
  background: #f3f3f3;
  color: #515862;
  font-size: 14px;
  border-radius: 5px;
}
</style>
