<template>
  <accordion-view title="포인트 사용내역">
    <section>
      <div class="period">조회 기간:</div>
      <ul>
        <li class="labels">
          <span class="label">날짜</span>
          <span class="labelLayout">
            <span class="label">구분</span>
            <span class="label">사용처</span>
          </span>
          <span class="labelLayout">
            <span class="label">참여자</span>
            <span class="label">제외자</span>
          </span>
          <span class="labelLayout">
            <span class="label">사용</span>
            <span class="label">인당차감</span>
          </span>
          <span class="label">차감사용</span>
        </li>
        <li class="value">
          <span class="label">04.05</span>
          <span class="labelLayout">
            <span class="label">식대초과</span>
            <span class="label">도마</span>
          </span>
          <span class="labelLayout">
            <span class="label">프릴, 제임스, 찰스</span>
            <span class="label">하울</span>
          </span>
          <span class="labelLayout">
            <span class="label">4000</span>
            <span class="label">{{ 4000 / 4 }}</span>
          </span>
          <span class="label">{{ (4000 / 4) * 3 }}</span>
        </li>
        <li class="value">
          <span class="label">04.07</span>
          <span class="labelLayout">
            <span class="label">식대초과</span>
            <span class="label">도마</span>
          </span>
          <span class="labelLayout">
            <span class="label">프릴, 제임스, 찰스</span>
            <span class="label">하울</span>
          </span>
          <span class="labelLayout">
            <span class="label">4000</span>
            <span class="label">{{ 4000 / 4 }}</span>
          </span>
          <span class="label">{{ (4000 / 4) * 3 }}</span>
        </li>
      </ul>
    </section>
  </accordion-view>
</template>

<script>
import AccordionView from '@/components/common/AccordionView.vue';

export default {
  name: 'AdminPointHistory',
  components: { AccordionView },
};
</script>

<style scoped lang="scss">
section {
}

.period {
  margin: 20px 20px 40px;
  padding: 10px;
}

.labels,
.value {
  @include flex(space-between);
  padding: 10px;
  font-size: 14px;
}

.labels {
  border-bottom: 5px solid var(--line);
}

.labelLayout {
  @include flex(center, cetner, column);
}
</style>
