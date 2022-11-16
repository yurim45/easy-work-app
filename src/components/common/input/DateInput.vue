<template>
  <label v-if="label">{{ label }}</label>
  <div class="layout">
    <input
      type="date"
      :value="inputValue"
      @input="(event) => handleValue(event.target.value)"
      :placeholder="placeholder"
      :disabled="isDisabled"
    />
    <button v-if="isBtnView" type="button" class="icon" @click="handleIsToday">
      <icon-check-blue :isDisabled="isToday" />
      <div class="today">오늘</div>
    </button>
  </div>
</template>

<script>
import { watch, onMounted, ref } from 'vue';
import moment from 'moment';
import IconCheckBlue from '../icons/IconCheckBlue.vue';

export default {
  name: 'DateInput',
  components: { IconCheckBlue },
  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '입력하세요',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isBtnView: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const isToday = ref(true);
    const inputValue = ref(null);

    onMounted(() => {
      if (isToday.value) {
        inputValue.value = moment().format('YYYY-MM-DD');
      } else {
        inputValue.value = null;
      }
    });

    watch(inputValue, (value) => {
      handleValue(value);
    });

    watch(props, () => {
      if (props.value && props.value !== moment().format('YYYY-MM-DD')) {
        inputValue.value = props.value;
        isToday.value = false;
      }
    });

    const handleValue = (value) => {
      if (value !== inputValue.value) isToday.value = false;
      if (value === moment().format('YYYY-MM-DD')) {
        isToday.value = true;
      }
      inputValue.value = value;
      emit('input', props.name, inputValue.value);
    };

    const handleIsToday = () => {
      isToday.value = !isToday.value;

      if (isToday.value) {
        inputValue.value = moment().format('YYYY-MM-DD');
      } else {
        inputValue.value = null;
      }
    };

    return { inputValue, isToday, handleValue, handleIsToday };
  },
};
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin-bottom: 13px;
  @include stLabel;
}

.layout {
  @include flex(space-between);
  margin-bottom: 30px;

  svg {
    margin: 0 7px 0 14px;
  }
}

.icon {
  @include flex;
  @include body400_14;
}

.today {
  width: 30px;
}

input {
  @include stInput;
}
</style>
