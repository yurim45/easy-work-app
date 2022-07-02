<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      v-model="iValue"
      @input="handleValue()"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'InputView',
  props: {
    label: String,
    name: String,
    placeholder: String,
    inputValue: String,
  },
  data() {
    return {
      iValue: this.inputValue,
    };
  },
  methods: {
    handleValue() {
      this.$emit('handleValue', { name: this.name, value: this.iValue });
    },
  },
};
</script>

<style scoped lang="scss">
div {
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
}

label {
  font-size: 16px;
  font-weight: 600;
}

input {
  width: 100%;
  height: 35px;
  padding: 10px 0 0;
  border-bottom: 1px solid var(--line);

  &:focus {
    border-bottom: 2px solid var(--primary);
  }

  &::placeholder {
    padding: 10px;
    color: var(--text-999);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.2px;
  }
}
</style>
