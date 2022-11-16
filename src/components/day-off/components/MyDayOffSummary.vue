<template>
  <div class="card">
    <p>나의 잔여 연차</p>
    <div class="box">
      <div>
        <strong>{{ store.getters.me.dayoffCnt }}</strong> <span>일</span>
      </div>
      <basic-button label="연차쓰기" @onClick="goToApplyDayOff" />
    </div>
  </div>
</template>

<script>
import { computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_MY } from '@/graphql/index.js';
import BasicButton from '@/components/common/button/BasicButton.vue';
import { getNumFormat } from '@/util';

export default {
  components: { BasicButton },
  name: 'MyDayOffSummary',
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();

    const { result: my, refetch } = useQuery(QUERY_MY);

    onMounted(() => {
      refetch();

      if (my.value) {
        store.dispatch('getMyInfo', {
          my: my.value.my.my,
        });
      }
    });

    watch(my, () => {
      if (my.value) {
        store.dispatch('getMyInfo', {
          my: my.value.my.my,
        });
      }
    });

    const myPoint = computed(() => getNumFormat(store.getters.me.point));

    const goToApplyDayOff = () => {
      router.push('/day-off/apply');
    };

    return { store, myPoint, goToApplyDayOff };
  },
};
</script>

<style lang="scss" scoped>
.card {
  @include stLayout;
  padding-bottom: 30px;
}

p {
  margin-bottom: 7px;
  @include body600_15;
}

.box {
  @include flex(space-between);

  strong {
    @include 특수800_34;
  }

  span {
    @include title700_15;
  }

  button {
    width: 90px;
  }
}
</style>
