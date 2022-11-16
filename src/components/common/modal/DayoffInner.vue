<template>
  <div class="inner">
    <p class="title">발급을 완료했습니다.</p>
    <div class="boxtitle">발급에 실패한 인원</div>
    <div class="row">
      <div v-for="user in data" :key="user.id">
        <user-profile :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import UserProfile from '@/components/admin/components/UserProfile.vue';

export default {
  name: 'DayoffInner',
  components: { UserProfile },
  props: {
    title: String,
    data: Array,
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
.inner {
  width: 100%;
}

.title {
  margin-bottom: 24px;
  @include title700_17;
  text-align: center;
  overflow: hidden;
  white-space: normal;
  word-break: keep-all;
}

.boxtitle {
  color: var(--red500);
  @include body400_14;
  text-align: center;
}

.row {
  @include flex();
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}
</style>
