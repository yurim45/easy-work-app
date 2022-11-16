<template>
  <li :class="{ linelist: i < length - 1 }">
    <button type="button" @click="goToPage">
      <div class="content">
        <strong>{{ name }}</strong>
      </div>
      <div class="info">
        <strong>{{ data.user.nickname }}</strong
        ><icon-separator />
        <span>{{ date }}</span>
      </div>
    </button>
  </li>
</template>

<script>
import { computed, onMounted } from 'vue';
import router from '@/router';
import { IconSeparator } from '@/components/common/icons/index.js';
import { dateFormatFull } from '@/util';
import { _DAYOFF_CODE } from '@/constants';

export default {
  name: 'ApplyStatusList',
  components: {
    IconSeparator,
  },
  props: {
    selectItem: Function,
    data: {
      type: Object,
    },
    length: Number,
    i: Number,
  },
  setup(props) {
    onMounted(() => {});

    const name = computed(() => _DAYOFF_CODE[props.data.category]);
    const date = computed(() => dateFormatFull(props.data.updatedAt));

    const handleChecked = (event) => {
      props.selectItem(props.data.id, event.target.checked);
    };

    const goToPage = () => {
      router.push({
        name: 'adminDayOffDetail',
        query: { id: props.data.id, isAdmin: true },
      });
    };

    return { name, date, handleChecked, goToPage };
  },
};
</script>

<style lang="scss" scoped>
li {
  @include flex(flex-start);
  padding: 12px 0;
  cursor: pointer;
}

.linelist {
  border-bottom: 1px solid var(--line);
}

.content {
  @include flex(flex-start);

  strong {
    margin-bottom: 3px;
    @include body600_15;
  }
}

.info {
  @include flex(flex-start);

  strong {
    @include body500_13;
  }

  svg {
    margin: 0 8px;
  }

  span {
    color: var(--gray999);
    @include body400_13;
  }
}
</style>
