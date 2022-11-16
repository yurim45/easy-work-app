<template>
  <section class="section">
    <div class="summary" :class="{ black: type === 'sp' }">
      <div class="top">
        <p>전체 잔여 포인트</p>
        <strong>{{ cuurPoint }}</strong> <span>{{ pointName }}</span>
      </div>
      <div class="line" :class="{ blackline: type === 'sp' }" />
      <div class="bottom">
        <div>
          <p>누적 발행 포인트</p>
          <strong>{{ totalPoint }} {{ pointName }}</strong>
        </div>
        <div class="second">
          <p>누적 사용 포인트</p>
          <strong>{{ usePoint }}{{ pointName }}</strong>
        </div>
      </div>
    </div>
    <img
      class="atnpImg"
      v-if="type === 'atp' && isImgView"
      alt=""
      src="@/assets/images/point/black.png"
    />
    <img
      class="spImg"
      v-if="type === 'sp' && !isImgView"
      alt=""
      src="@/assets/images/point/blue.png"
    />
    <point-menu :type="type" />
  </section>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_POINT_REPORT } from '@/graphql/point';
import { getNumFormat } from '@/util';
import PointMenu from './PointMenu.vue';

export default {
  name: 'PointSummary',
  components: { PointMenu },
  props: {
    type: { type: String, default: 'atp' },
    isImgView: Boolean,
  },
  setup(props) {
    const state = ref({
      cuurPoint: null,
      totalPoint: null,
      usePoint: null,
    });

    const { result, refetch } = useQuery(QUERY_POINT_REPORT, {
      useItemCategory: [],
    });

    onMounted(() => {
      refetch();

      if (result.value) {
        handleData();
      }
    });

    watch(result, () => {
      handleData();
    });

    const handleData = () => {
      state.value = {
        cuurPoint:
          props.type === 'atp'
            ? result.value.getPointReport.result.find(
                (v) => v.name === 'restPoints'
              ).price
            : 0,
        totalPoint:
          props.type === 'atp'
            ? result.value.getPointReport.result.find(
                (v) => v.name === 'totalPublishedPoints'
              ).price
            : 0,
        usePoint:
          props.type === 'atp'
            ? result.value.getPointReport.result.find(
                (v) => v.name === 'totalUsedPoints'
              ).price
            : 0,
      };
    };

    const pointName = computed(() => (props.type === 'sp' ? 'SP' : 'ATP'));
    const cuurPoint = computed(() => getNumFormat(state.value.cuurPoint));
    const totalPoint = computed(() => getNumFormat(state.value.totalPoint));
    const usePoint = computed(() => getNumFormat(state.value.usePoint));

    return { cuurPoint, totalPoint, usePoint, pointName };
  },
};
</script>

<style lang="scss" scoped>
.section {
  @include stLayout;
  color: var(--white);
}

.summary {
  position: relative;
  padding: 22px 24px;
  background: var(--blue500);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
}

.top {
  p {
    margin-bottom: 5px;
    @include body700_14;
  }

  strong {
    @include title800_26;
  }

  span {
    @include title700_15;
  }
}

.line {
  margin: 18px 0 14px;
  @include stLayout;
  height: 1px;
  background: var(--blue400);
}

.bottom {
  @include flex(space-between);
  text-align: left;

  div {
    padding: 0 2px;
  }

  p {
    @include body500_13;
  }

  strong {
    @include title700_15;
  }
}

.second {
  margin-left: 30px;
}

.black {
  background: var(--black);
}

.blackline {
  background: var(--gray555);
}

.atnpImg {
  position: fixed;
  top: -15px;
  right: 0px;
  width: 40px;
  height: 225px;
}

.spImg {
  position: fixed;
  top: -15px;
  left: 0px;
  width: 40px;
  height: 225px;
}
</style>
