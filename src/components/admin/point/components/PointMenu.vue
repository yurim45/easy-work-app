<template>
  <div class="icons">
    <button type="button" @click="goToPage('point')" class="icon">
      <img alt="포인트 발급" src="./image/point.png" />
      포인트발급
    </button>
    <div class="iconline" />
    <button type="button" @click="goToPage('input')" class="icon">
      <img alt="포인트 기록" src="./image/input.png" />
      기록하기
    </button>
    <div class="iconline" />
    <button type="button" @click="goToPage('history')" class="icon">
      <img alt="포인트 내역" src="./image/history.png" />
      사용내역
    </button>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

export default {
  name: 'PointMenu',
  props: {
    type: {
      type: String,
      default: 'atp',
    },
  },
  setup(props) {
    const store = useStore();

    onMounted(() => {});

    const goToPage = (name) => {
      if (props.type === 'sp') {
        alert('준비중입니다!😃');
      } else {
        switch (name) {
          case 'point':
            if (store.getters.me.role === 'Root') {
              router.push({
                path: '/admin/point/create',
                query: {
                  type: props.type,
                },
              });
              return;
            } else {
              alert('Root 관리자만 이용할 수 있습니다.');
              return;
            }
          case 'input':
            router.push({
              path: '/point/input',
              query: {
                type: props.type,
              },
            });
            return;
          case 'history':
            router.push({
              path: '/admin/point/detail',
              query: {
                type: props.type,
              },
            });
            return;
        }
      }
    };
    return { goToPage };
  },
};
</script>

<style lang="scss" scoped>
.icons {
  @include flex(space-around);
  margin-top: 22px;
  padding: 18px 24px 16px;
  width: 100%;
  max-width: 600px;
  background: var(--white);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
}

.icon {
  @include flex(center, center, column);
  @include body500_13;
  color: var(--black);

  img {
    width: 36px;
    margin-bottom: 6px;
  }
}

.iconline {
  width: 1px;
  height: 40px;
  margin: 0 24px;
  background: var(--line);
}
</style>
