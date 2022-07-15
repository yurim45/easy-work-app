<template>
  <section class="section">
    <h3>특별휴가</h3>
    <ul class="annualList">
      <li>
        <div class="title">
          <icon-special />
          <div>
            <strong>연말정산 특별휴가</strong>
            <div class="day">
              <span>5일</span> <span class="dueDate">(D-3)</span>
            </div>
          </div>
        </div>
        <button class="apply" @click="goToApply('special')">신청</button>
      </li>
      <li>
        <div class="title">
          <icon-summer />
          <div>
            <strong>여름휴가</strong>
            <div class="day">3일</div>
          </div>
        </div>
        <button class="apply" @click="goToApply('summer')">신청</button>
      </li>
      <li>
        <div class="title">
          <icon-alone />
          <div>
            <strong>혼떠</strong>
            <div class="day">1일</div>
          </div>
        </div>
        <button class="apply" @click="goToApply('alone')">신청</button>
      </li>
      <li>
        <div class="title">
          <icon-apple />
          <div>
            <strong>Apple vacation</strong>
            <div class="day">30일</div>
          </div>
        </div>

        <button class="apply" @click="goToApply('apple')">신청</button>
      </li>
    </ul>
  </section>
</template>

<script>
import {
  IconAlone,
  IconApple,
  IconSpecial,
  IconSummer,
} from '../icons/special/index';

export default {
  name: 'SpecialVacation',
  components: {
    IconSpecial,
    IconAlone,
    IconSummer,
    IconApple,
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
  @include flex(center, center, row);

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

.day {
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: -1px;
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
