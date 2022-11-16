<template>
  <div class="card">
    <p v-if="!isAdmin">잔여 포인트</p>
    <p v-else>누적 사용 포인트</p>
    <div class="box">
      <div v-if="!isAdmin">
        <strong>{{ myPoint }}</strong> <span>{{ pointName }}</span>
      </div>
      <div v-else>
        <strong>{{ point }}</strong> <span>{{ pointName }}</span>
      </div>
      <basic-button label="기록하기" @onClick="goToWriteHistory" />
    </div>
    <router-link v-if="!isAdmin" to="/point/share"
      >동료에게 포인트 보내기</router-link
    >
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_MY } from '@/graphql/index.js';
import { QUERY_POINT_REPORT } from '@/graphql/point';
import router from '@/router';
import BasicButton from '@/components/common/button/BasicButton.vue';
import { getNumFormat } from '@/util';

export default {
  components: { BasicButton },
  name: 'MyPointSummary',
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'atp',
    },
  },
  setup(props) {
    const store = useStore();

    const { result: my, refetch } = useQuery(QUERY_MY);
    const { result, refetch: pointRefetch } = useQuery(QUERY_POINT_REPORT, {
      useItemCategory: [],
    });

    onMounted(() => {
      refetch();
      pointRefetch();

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

    const pointName = computed(() => (props.type === 'atp' ? 'ATP' : 'SP'));
    const myPoint = computed(() => getNumFormat(my.value?.my.my.point));
    const point = computed(() =>
      getNumFormat(
        Math.abs(
          props.type === 'atp'
            ? result.value?.getPointReport.result.find(
                (v) => v.name === 'totalUsedPoints'
              ).price
            : 0
        )
      )
    );

    const goToWriteHistory = () => {
      router.push({ path: '/point/input', query: { type: props.type } });
    };

    return { pointName, myPoint, point, goToWriteHistory };
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

a {
  display: inline-block;
  margin-top: 14px;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -0.2px;
  text-decoration-line: underline;
  color: var(--blue500);
}
</style>
