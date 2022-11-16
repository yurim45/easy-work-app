<template>
  <label>카테고리</label>
  <ul>
    <li
      v-for="(item, i) in categoryItem"
      :key="i"
      class="item"
      :class="{ active: item.value === selectValue }"
      @click="selectItem(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script>
import { onMounted, ref, watch } from 'vue';

export default {
  name: 'PointCategory',
  props: {
    handleValue: Function,
    value: {
      type: String,
    },
  },
  setup(props) {
    const selectValue = ref(null);

    onMounted(() => {
      selectValue.value = props.value;
    });

    watch(props, () => {
      selectValue.value = props.value;
    });

    const categoryItem = ref([
      { value: 'ExceedMeal', text: '식대초과' },
      { value: 'Snacks', text: '식음료' },
      { value: 'Culture', text: '문화' },
      { value: 'Item', text: '물품' },
      { value: 'Together', text: '회식' },
    ]);

    const selectItem = (item) => {
      selectValue.value = item.value;
      props.handleValue('useItem', item.value);
    };

    return { categoryItem, selectValue, selectItem };
  },
};
</script>

<style lang="scss" scoped>
label {
  @include stLabel;
}

ul {
  @include flex(flex-start);
  margin: 13px 0 10px;
  padding-bottom: 20px;
  overflow: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
}

.item {
  margin-right: 6px;
  padding: 4px 8px;
  min-width: 66px;
  background: var(--line);
  @include body400_14;
  color: var(--gray555);
  text-align: center;
  border-radius: 5px;
}

.active {
  background: var(--blue500);
  color: var(--white);
}
</style>
