<template>
  <section class="section">
    <h3>기타 휴가</h3>
    <ul class="annualList">
      <li
        v-for="dayoff in dayoffList"
        :key="dayoff.id"
        @click="goToApply(dayoff.url)"
      >
        {{ dayoff.name }}
      </li>
    </ul>
  </section>
</template>

<script>
import { OTHER_DAYOFF_LIST } from '@/constants/index.js';

export default {
  name: 'OtherDayOff',
  setup() {
    const dayoffList = OTHER_DAYOFF_LIST;

    const goToApply = (dayoff) => {
      alert('관리자에게 문의해주세요');
      console.log(dayoff);
    };

    return { goToApply, dayoffList };
  },
};
</script>

<style lang="scss" scoped>
.section {
  @include stLayout;

  h3 {
    margin: 40px 0 22px;
    @include title800_20;
  }
}

li {
  width: 100%;
  margin-bottom: 25px;
  @include title700_15;
}

.title {
  @include flex(flex-start);
  width: 100%;

  svg {
    margin-right: 14px;
  }

  div {
    @include body600_15;
  }
}

.day {
  color: var(--blue-txt);
  @include body600_14;

  svg {
    margin: 0 8px;
  }
}

.dueDate {
  color: var(--red-txt);
  @include body600_14;
}
</style>
