<template>
  <section class="section">
    <div class="card" :class="{ black: type === 'sp' }">
      <img
        v-if="type === 'atp'"
        alt=""
        src="@/assets/images/point/blueCard.png"
      />
      <img
        v-if="type === 'sp'"
        alt=""
        src="@/assets/images/point/blackCard.png"
      />
      <div class="box" :class="{ black: type === 'sp' }">
        <router-link to="/point/share" v-if="type === 'atp'">
          동료에게 포인트 선물
        </router-link>
        <basic-button label="기록하기" @onClick="goToWriteHistory" />
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
    <div class="inner">
      <p>잔여 포인트</p>
      <div class="point">
        <strong>{{ myPoint }}</strong>
        <span>{{ type === 'atp' ? 'ATP' : 'SP' }}</span>
      </div>
    </div>
  </section>
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
  name: 'NewPointSummary',
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isImgView: Boolean,
    type: { type: String, default: 'atp' },
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

    const myPoint = computed(() =>
      getNumFormat(props.type === 'atp' ? my.value?.my.my.point : 0)
    );
    const point = computed(() =>
      getNumFormat(
        Math.abs(
          result.value?.getPointReport.result.find(
            (v) => v.name === 'totalUsedPoints'
          ).price
        )
      )
    );

    const goToWriteHistory = () => {
      if (props.type === 'sp') {
        alert('준비중입니다!😃');
      } else {
        router.push('/point/input');
      }
    };

    return { myPoint, point, goToWriteHistory };
  },
};
</script>

<style lang="scss" scoped>
.section {
  @include stLayout;
  height: 220px;
}

.card {
  position: relative;
  margin: 5px 0 30px;
  padding: 20px 22px;
  width: 100%;
  max-width: 600px;
  height: 190px;
  background: var(--blue500);
  color: var(--white);
  border-radius: 20px;
  overflow: hidden;

  img {
    position: absolute;
    width: 115%;
    right: -12px;
    bottom: -14px;
  }
}

.atnpImg {
  position: fixed;
  top: 50px;
  right: 0px;
  width: 40px;
  height: 230px;
}

.spImg {
  position: fixed;
  top: 50px;
  left: 0px;
  width: 40px;
  height: 230px;
}

p {
  margin-bottom: 5px;
  color: var(--white);
  @include body700_14;
}

.point {
  margin-bottom: 45px;
  color: var(--white);

  strong {
    @include 특수800_34;
  }

  span {
    @include title700_15;
  }
}

.box {
  @include flex(space-between);
  position: relative;
  top: 110px;
  left: 0;

  button {
    width: 90px;
    background: var(--blue400);
    color: var(--white);
    z-index: 100;
  }
}

.inner {
  position: relative;
  top: -200px;
  left: 26px;
}

a {
  display: inline-block;
  margin-top: 14px;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -0.2px;
  text-decoration-line: underline;
  color: var(--white);
  z-index: 100;
}

.black {
  @include flex(flex-end);
  width: 100%;
  max-width: 600px;
  background: var(--black);

  button {
    position: relative;
    top: -55px;
    background: var(--gray555);
  }
}
</style>
