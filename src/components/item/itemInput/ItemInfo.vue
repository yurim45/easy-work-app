<template>
  <div class="items">
    <div class="label">
      <label>{{ label }}</label>
      <button v-if="id !== 1" type="button" @click="deleteItem(id)">
        삭제
      </button>
    </div>
    <basic-input
      placeholder="물품명 입력해주세요."
      :name="`name${id}`"
      :handleValue="handleValue"
      :value="state[`name${id}`]"
    />
    <basic-input
      type="number"
      placeholder="물품 단가를 입력해주세요."
      :name="`eachPrice${id}`"
      :handleValue="handleValue"
      :value="state[`eachPrice${id}`]"
    />
    <basic-input
      type="number"
      placeholder="요청갯수를 입력해주세요."
      :name="`quantity${id}`"
      :handleValue="handleValue"
      :value="state[`quantity${id}`]"
    />
    <input placeholder="0 원" :disabled="true" :value="total" />
    <basic-input
      placeholder="Url을 입력해주세요."
      type="url"
      :name="`itemUrl${id}`"
      :handleValue="handleValue"
      :value="state[`itemUrl${id}`]"
    />
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { debounce } from 'lodash';
import { BasicInput } from '@/components/common/index.js';
import { getNumFormat } from '@/util/index.js';

export default {
  name: 'ItemInfo',
  components: {
    BasicInput,
  },
  props: {
    id: Number,
    name: String,
    label: String,
    handleItem: Function,
    deleteItem: Function,
    value: Object,
  },
  setup(props) {
    const state = ref({});

    const total = ref(null);

    onMounted(() => {
      handleData();
    });

    watch(props, () => {
      if (props.value) {
        handleData();
      }
    });

    const handleData = () => {
      state.value = {
        id: props.id,
        [`name${props.id}`]: props.value[`name${props.id}`],
        [`eachPrice${props.id}`]: props.value[`eachPrice${props.id}`],
        [`quantity${props.id}`]: props.value[`quantity${props.id}`],
        [`itemUrl${props.id}`]: props.value[`itemUrl${props.id}`],
      };
    };

    const handleValue = debounce(
      (name, value) => {
        state.value[name] = value;

        if (
          state.value[`eachPrice${props.id}`] &&
          state.value[`quantity${props.id}`]
        ) {
          total.value = `${getNumFormat(
            state.value[`eachPrice${props.id}`] *
              state.value[`quantity${props.id}`]
          )} 원`;
          state.value[`totalPrice${props.id}`] = total.value
            .replace(' 원', '')
            .replaceAll(',', '');
        }

        if (
          state.value[`name${props.id}`] &&
          state.value[`eachPrice${props.id}`] &&
          state.value[`quantity${props.id}`] &&
          state.value[`itemUrl${props.id}`]
        ) {
          props.handleItem(state.value);
        }
      },
      [200]
    );

    return { state, total, handleValue };
  },
};
</script>

<style lang="scss" scoped>
.items {
  @include stLayout;
  margin-bottom: 30px;
}

.label {
  @include flex(space-between);
  margin-bottom: 13px;

  button {
    color: var(--red-txt);
    @include body400_14;
  }
}

input {
  @include stInput;
  margin-bottom: 8px;
}

label {
  display: block;
  @include stLabel;
}
</style>

<style lang="scss">
.items {
  .layout {
    margin-bottom: 8px;
  }
}
</style>
