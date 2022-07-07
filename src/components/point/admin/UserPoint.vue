<template>
  <accordion-view title="인별 포인트 현황">
    <div class="value">
      <ul>
        <li class="userInfo">
          <span class="empty">ㅤ</span>
          <strong class="name">이름</strong>
          <span class="point">적립</span>
          <span class="point">사용</span>
          <span class="point">잔여</span>
        </li>
        <li v-for="user in users" :key="user.value" class="userInfo">
          <span class="icon">{{ icon(user) }}</span>
          <strong class="name">{{ user.name }}</strong>
          <span class="point">{{ userPoint(user.point) }} P</span>
          <span class="point">{{ userPoint(user.point) }} P</span>
          <span class="point">{{ userPoint(user.point) }} P</span>
        </li>
      </ul>
    </div>
  </accordion-view>
</template>

<script>
import AccordionView from '@/components/common/AccordionView.vue';
import { USER_LIST } from '@/constants';
import { getNumFormat } from '@/util';
export default {
  components: { AccordionView },
  name: 'UserPointStatue',
  data() {
    return {
      users: USER_LIST,
    };
  },
  computed: {
    icon() {
      return (user) => user.name.substring(0, 1);
    },
    userPoint() {
      return (point) => getNumFormat(point);
    },
  },
};
</script>

<style scoped lang="scss">
.value {
  padding: 20px;
}

.userInfo {
  @include flex(space-between);
  margin: 10px 0;
}

.icon {
  @include flex;
  width: 40px;
  height: 40px;
  @include stIcon;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50%;
}
.empty {
  width: 40px;
}

.name {
  width: 80px;
  font-size: 13px;
  text-align: center;
}

.point {
  width: 80px;
  font-size: 13px;
  text-align: center;
}
</style>
