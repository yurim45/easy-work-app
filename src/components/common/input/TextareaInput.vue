<template>
  <label v-if="label" :for="name">{{ label }}</label>
  <textarea
    :name="name"
    maxlength="50"
    @input="handleChange"
    :placeholder="placeholder"
    :value="inputValue"
    @blur="handleBlur"
  />
  <p v-show="errorMessage">
    {{ errorMessage }}
  </p>
</template>

<script>
import { onMounted, watch } from 'vue';
import { toRef } from 'vue';
import { useField } from 'vee-validate';

export default {
  name: 'TextareaInput',
  props: {
    handleValue: Function,
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '내용을 입력하세요',
    },
    value: {
      type: [String, Number],
    },
    message: {
      type: String,
    },
  },
  setup(props) {
    const name = toRef(props, 'name');

    onMounted(() => {});

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

textarea {
  @include stInput;
  height: 98px;
}

p {
  margin: 6px 0;
  color: var(--red-txt);
  @include body700_11;
}
</style>
