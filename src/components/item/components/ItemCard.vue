<template>
  <div class="card">
    <h4>{{ data.name }}</h4>
    <div class="content">
      <span>{{ getExpense(data.eachPrice) }} 원</span>
      <icon-separator />
      <span>{{ getCnt(data.quantity) }}개</span>
    </div>
    <div class="amount">
      <a :href="data.itemUrl" target="_blank">제품보기</a>
      <strong class="amount"> {{ getExpense(data.totalPrice) }}원</strong>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { IconSeparator } from '@/components/common/icons/index.js';
import { getNumFormat } from '@/util';

export default {
  name: 'ItemCard',
  components: { IconSeparator },
  props: {
    data: Object,
  },
  setup() {
    onMounted(() => {});

    const getCnt = (data) => {
      return getNumFormat(data);
    };

    const getExpense = (data) => {
      return getNumFormat(data);
    };

    return { getCnt, getExpense };
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 12px;
  padding: 20px 22px;
  background: var(--whtie);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  border-radius: 13px;
}

h4 {
  @include title700_17;
}

.content {
  @include flex(flex-start, center);
  margin: 3px 0 18px;
  @include body400_13;
  color: var(--gray999);

  svg {
    margin: 0 6px;
  }
}

.amount {
  @include flex(space-between);

  a {
    @include body400_13;
    color: var(--blue-txt);
    text-decoration: underline;
  }

  strong {
    @include title700_17;
  }
}
</style>
