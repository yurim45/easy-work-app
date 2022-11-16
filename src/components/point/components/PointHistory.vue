<template>
  <section>
    <ul v-if="pointData?.length > 0">
      <li
        v-for="(point, i) in pointData"
        :key="point.id"
        @click="goToPointDetail(point)"
      >
        <div>
          <div v-if="isDateView(point, i)" class="date">
            {{ getDateFormat(point.date) }}
          </div>
          <div v-if="!isDateView(point, i)" class="date" />
        </div>
        <div class="info" :class="{ listline: i < pointData.length - 1 }">
          <div class="useInfo">
            <p>{{ getSubtitle(point) }}</p>
            <span>{{ getUseItemFormat(point.useItem) }}</span>
            <icon-separator />
            <span>{{ getUsers(point) }}명</span>
          </div>
          <div class="amount">
            <strong :class="{ blue: point.useItem === 'Publish' }">
              {{ getExpense(point.eachExpense) }}
            </strong>
            <div>
              {{ getTotalExpense(point.totalExpense) }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { watch, onMounted, ref } from 'vue';
import router from '@/router';
import IconSeparator from '@/components/common/icons/IconSeparator.vue';
import { dateFormat, getNumFormat } from '@/util';
import { ITEM_CODE } from '@/constants';

export default {
  components: { IconSeparator },
  name: 'PointHistory',
  props: {
    data: {
      type: Array,
    },
    isAdmin: Boolean,
  },
  setup(props) {
    const pointData = ref([]);

    onMounted(() => {
      pointData.value = props.data;
    });

    watch(props, () => {
      pointData.value = props.data;
    });

    const goToPointDetail = (data) => {
      router.push({
        name: 'pointDetail',
        query: { id: data.id, isAdmin: props.isAdmin },
      });
    };

    const isDateView = (point, i) => {
      if (i === 0) {
        return true;
      } else {
        return point.date === pointData.value[i - 1].date ? false : true;
      }
    };

    const getDateFormat = (data) => {
      return dateFormat(data);
    };

    const getUseItemFormat = (data) => {
      return ITEM_CODE[data];
    };

    const getSubtitle = (data) => {
      switch (data.useItem) {
        case 'Publish':
          return '관리자 발급';
        case 'Send':
          return '포인트 선물🎁';
        case 'Receive':
          return '포인트 선물🎉';
        default:
          return data.usePlace.name;
      }
    };

    const getExpense = (data) => {
      return getNumFormat(data);
    };

    const getTotalExpense = (data) => {
      return getNumFormat(data);
    };

    const getUsers = (point) => {
      return getNumFormat(
        point.targets?.length + (point.nonTargets?.length ?? 0)
      );
    };

    return {
      goToPointDetail,
      getExpense,
      getDateFormat,
      getUseItemFormat,
      getUsers,
      getTotalExpense,
      getSubtitle,
      pointData,
      isDateView,
    };
  },
};
</script>

<style lang="scss" scoped>
ul {
  padding: 30px;
  width: 100%;
}

li {
  @include flex(flex-start, flex-start);
  width: 100%;
  margin-bottom: 12px;
}

.info {
  @include flex(space-between);
  width: 100%;
  padding-bottom: 12px;
}

.date {
  width: 30px;
  margin-right: 25px;
  @include body400_14;
  color: var(--gray555);
  text-align: left;
}

.listline {
  border-bottom: 1px solid var(--line);
}

.useInfo {
  width: 100%;
  text-align: left;

  p {
    margin-bottom: 3px;
    @include body600_15;
  }

  span {
    @include body400_13;
    color: var(--gray999);
  }

  svg {
    margin: 0 8px;
  }
}

.amount {
  text-align: right;

  strong {
    @include body600_15;
  }

  div {
    @include body400_13;
    color: var(--gray999);
  }
}

.blue {
  color: var(--blue-txt);
}
</style>
