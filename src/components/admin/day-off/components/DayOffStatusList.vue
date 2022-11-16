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
    <div
      v-if="type === 'readOnly'"
      class="day"
      :class="{ red: data.dayoffCnt < 0 }"
    >
      {{ data.dayoffCnt }}일
    </div>

    <div v-if="type === 'create'" class="create day">
      <input
        type="number"
        placeholder="0"
        name="period"
        @input="(e) => handleValue('period', e.target.value, data)"
      />일
    </div>
  </li>
</template>

<script>
import { computed, onMounted } from 'vue';
import { ProfileImage } from '@/components/common/index.js';
import { dateFormatYear } from '@/util';

export default {
  name: 'DayOffStatusList',
  components: {
    ProfileImage,
  },
  props: {
    data: {
      type: Object,
    },
    type: {
      type: String,
      default: 'readOnly',
    },
    handleValue: Function,
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
    margin-bottom: 1px;
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

.listline {
  border-bottom: 1px solid var(--line);
}

.create {
  input {
    @include stInput;
    width: 42px;
    height: 32px;
    margin-right: 4px;
  }
}

@media screen and (min-width: 400px) {
  .create {
    input {
      width: 80px;
    }
  }
}
</style>
