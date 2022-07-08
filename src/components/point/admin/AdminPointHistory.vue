<template>
  <accordion-view title="포인트 사용내역">
    <section>
      <div>조회 기간:</div>
      <ul>
        <li>
          <span class="label">날짜</span>
          <span class="label">구분</span>
          <span class="label">사용처</span>
          <span class="label">참여자</span>
          <span class="label">제외자</span>
          <span class="label">사용</span>
          <span class="label">인당차감</span>
          <span class="label">차감사용</span>
        </li>
        <li v-for="user in users" :key="user.value"></li>
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

<style>
section {
  /* padding: 20px; */
}
</style>
