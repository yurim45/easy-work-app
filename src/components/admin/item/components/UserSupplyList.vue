<template>
  <li class="list" :class="{ listline: i < length - 1 }">
    <div class="info">
      <div class="img">
        <profile-image :name="data.nickname" :url="data.url" />
      </div>
      <div class="user">
        <strong>{{ data.nickname }}</strong>
        <span>{{ date }}</span>
      </div>
    </div>
    <div class="day" :class="[{ dim: data.purchaseList.length === 0 }]">
      {{ data.purchaseList.length }}건
    </div>
  </li>
</template>

<script>
import { computed, onMounted } from 'vue';
import { ProfileImage } from '@/components/common/index.js';
import { dateFormatYear } from '@/util';

export default {
  name: 'UserSupplyList',
  components: {
    ProfileImage,
  },
  props: {
    data: {
      type: Object,
    },
    length: Number,
    i: Number,
  },
  setup(props) {
    onMounted(() => {});

    const date = computed(() => dateFormatYear(props.data.joinDay));

    return { date };
  },
};
</script>

<style lang="scss" scoped>
.list {
  @include flex(space-between);
  padding: 14px 0;
  cursor: pointer;
}

.listline {
  border-bottom: 1px solid var(--line);
}

.img {
  margin-right: 12px;
  width: 32px;
  height: 32px;
}

.info {
  @include flex(flex-start);
}

.user {
  @include flex(flex-start, flex-start, column);

  strong {
    @include body600_14;
  }

  span {
    color: var(--gray999);
    @include body700_11;
  }
}

.day {
  @include body600_14;
}

.red {
  color: var(--red-txt);
}

.dim {
  color: var(--line2);
}
</style>
