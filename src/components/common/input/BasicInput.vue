<template>
  <label v-if="label" :for="name">{{ label }}</label>
  <div class="layout">
    <input
      :name="name"
      :type="type"
      @input="handleChange"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :value="inputValue"
      @blur="handleBlur"
      :pattern="type === 'number' && `[0-9]*`"
      autocomplete="nope"
    />
  </div>
  <p v-show="errorMessage">
    {{ errorMessage }}
  </p>
</template>

<script>
import { onMounted, watch } from 'vue';
import { toRef } from 'vue';
import { useField } from 'vee-validate';

export default {
  name: 'BasicInput',
  props: {
    handleValue: Function,
    label: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '내용을 입력하세요',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
    },
    message: {
      type: String,
    },
  },
  setup(props) {
    onMounted(() => {});

    const name = toRef(props, 'name');

    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
    } = useField(name, undefined, {
      initialValue: props.value,
    });

    watch(props, () => {
      inputValue.value = props.value;
    });

    watch(inputValue, () => {
      props.handleValue(props.name, inputValue.value);
    });

    return { inputValue, errorMessage, handleBlur, handleChange };
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
  width: 100%;

  svg {
    margin: 0 7px 0 14px;
  }
}

.icon {
  @include flex;
  @include body400_14;

  div {
    width: 25px;
  }
}

input {
  @include stInput;
}

p {
  margin: -25px 0 12px;
  color: var(--red-txt);
  @include body700_11;
}
</style>
