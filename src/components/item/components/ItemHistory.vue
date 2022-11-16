<template>
  <section>
    <ul v-if="itemData?.length > 0">
      <li
        v-for="(item, i) in itemData"
        :key="item.id"
        @click="goToItemDetail(item)"
      >
        <div>
          <div v-if="isDateView(item, i)" class="date">
            {{ getDateFormat(item.updatedAt) }}
          </div>
          <div v-if="!isDateView(item, i)" class="date" />
        </div>
        <div class="info" :class="{ listline: i < itemData?.length - 1 }">
          <div class="itemCnt">
            <div class="title">
              <p>
                {{ item.title }}
              </p>
              <span>
                <icon-approved v-if="item.purchaseStatus === 'Approved'" />
                <icon-hold v-if="item.purchaseStatus === 'Pending'" />
                <icon-rejected v-if="item.purchaseStatus === 'Rejected'" />
                <icon-complete v-if="item.purchaseStatus === 'Complete'" />
              </span>
            </div>
            <span>{{ getFormat(item.category) }}</span>
            <icon-separator />
            <span>{{ getCnt(item.items[0]?.quantity) }}개</span>
          </div>
          <div class="amount">
            <strong> {{ getExpense(item.finalPrice) }}원</strong>
            <div>단가 {{ getTotalExpense(item.items[0]?.eachPrice) }}원</div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { watch, onMounted, ref } from 'vue';
import router from '@/router';
import { dateFormat, getNumFormat } from '@/util';
import {
  IconSeparator,
  IconApproved,
  IconRejected,
  IconHold,
  IconComplete,
} from '@/components/common/icons/index.js';
import { SUPPLY_CODE } from '@/constants';

export default {
  components: {
    IconSeparator,
    IconApproved,
    IconRejected,
    IconHold,
    IconComplete,
  },
  name: 'ItemHistory',
  props: {
    data: {
      type: Array,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const itemData = ref([]);

    onMounted(() => {
      itemData.value = props.data;
    });

    watch(props, () => {
      itemData.value = props.data;
    });

    const goToItemDetail = (data) => {
      router.push({
        name: 'supplyDetail',
        query: { id: data.id, isAdmin: props.isAdmin },
      });
    };

    const isDateView = (data, i) => {
      if (i === 0) {
        return true;
      } else {
        return data.updatedAt?.substr(0, 10) ===
          itemData.value[i - 1].updatedAt?.substr(0, 10)
          ? false
          : true;
      }
    };

    const getDateFormat = (data) => {
      return dateFormat(data);
    };

    const getFormat = (data) => {
      return SUPPLY_CODE[data];
    };

    const getCnt = (data) => {
      return getNumFormat(data);
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
      goToItemDetail,
      getExpense,
      getDateFormat,
      getFormat,
      getUsers,
      getTotalExpense,
      getCnt,
      itemData,
      isDateView,
    };
  },
};
</script>

<style lang="scss" scoped>
ul {
  padding: 12px 30px;
  width: 100%;
}

li {
  width: 100%;
  margin-bottom: 12px;
  @include flex(space-between, flex-start);
}

.date {
  width: 30px;
  margin-right: 25px;
  @include body400_14;
  color: var(--gray555);
  text-align: left;
}

.info {
  @include flex(space-between);
  width: 100%;
  padding-bottom: 12px;
}

.listline {
  border-bottom: 1px solid var(--line);
}

.itemCnt {
  text-align: left;

  p {
    @include body600_15;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }

  span {
    color: var(--gray999);
    @include body400_13;
    height: 20px;
  }

  svg {
    margin: 0 8px;
  }
}

.title {
  @include flex(flex-start);
  margin-bottom: 3px;
}

.amount {
  text-align: right;

  strong {
    display: inline-block;
    min-width: 90px;
    @include body600_15;
  }

  div {
    min-width: 102px;
    @include body400_13;
    color: var(--gray999);
    text-align: right;
  }
}
</style>
