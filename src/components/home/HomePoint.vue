<template>
  <section>
    <sub-title subTitle="ATNP Point" url="/point" />
    <div class="stWrapper">
      <div class="form">
        <div class="text">
          <p>잔여포인트</p>
          <strong>{{ myPoint }}</strong> ATP
        </div>
        <div class="stButton">
          <button type="button" @click="goToWriteHistory">기록하기</button>
          <button type="button" @click="goToPointHistory">내역보기</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { SubTitle } from '@/components/common/index';
import router from '@/router';
import { getNumFormat } from '@/util';

export default {
  name: 'HomePoint',
  components: { SubTitle },
  setup() {
    const store = useStore();
    const myPoint = computed(() => getNumFormat(store.getters.me.point));

    const goToWriteHistory = () => {
      router.push({ path: '/point/input', query: { type: 'atp' } });
    };

    const goToPointHistory = () => {
      router.push('/point');
    };

    return { myPoint, goToWriteHistory, goToPointHistory, store };
  },
};
</script>

<style lang="scss" scoped>
.stWrapper {
  @include stLayout();
}

.form {
  @include stFormBox;
  color: var(--white);
  @include body600_15;

  .text {
    padding: 2px 5px 16px;
  }

  strong {
    @include title800_26;
  }
}

.stButton {
  @include flex(space-between);

  button {
    width: 100%;
    height: 40px;
    background: var(--blue400);
    color: var(--white);
    @include body600_14;
    border-radius: 10px;
  }

  :first-child {
    margin-right: 11px;
  }
}
</style>
