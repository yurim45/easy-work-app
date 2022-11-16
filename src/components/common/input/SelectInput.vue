<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :name="name"
      :value="inputValue"
      @input="handleChange"
      :disabled="isDisabled"
      @blur="handleBlur"
    >
      <option v-for="(item, i) in data" :key="i" :value="item.value">
        {{ item.name }}
      </option>
    </select>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.1477 13.6907C10.5495 14.3814 9.47805 14.3814 8.87989 13.6907L4.36901 8.48198C3.5277 7.51051 4.21778 6 5.50291 6L14.5247 6C15.8098 6 16.4999 7.51052 15.6586 8.48198L11.1477 13.6907Z"
        fill="black"
      />
    </svg>
  </div>
  <p v-show="errorMessage">
    {{ errorMessage }}
  </p>
</template>

<script>
import { watch } from 'vue';
import { toRef } from 'vue';
import { useField } from 'vee-validate';

export default {
  name: 'SelectInput',
  props: {
    handleValue: Function,
    label: {
      type: String,
    },
    data: {
      type: Array,
    },
    name: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
  },
  setup(props) {
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
div {
  position: relative;
}

label {
  display: block;
  margin-bottom: 13px;
  @include stLabel;
}

select {
  margin-bottom: 30px;
  @include stInput;
}

svg {
  position: absolute;
  right: 15px;
  margin-top: 13px;
}

p {
  margin: -25px 0 12px;
  color: var(--red-txt);
  @include body700_11;
}
</style>
