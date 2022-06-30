<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" v-model="iValue" @input="handleValue()" />
  </div>
</template>

<script>
export default {
  name: 'InputView',
  props: {
    label: String,
    name: String,
    inputValue: String,
  },
  data() {
    return {
      iValue: this.inputValue,
      iName: this.name,
    };
  },
  methods: {
    handleValue() {
      this.$emit('handleValue', { name: this.iName, value: this.iValue });
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
  margin-bottom: -5px;
  font-size: 16px;
  font-weight: 600;
}

input {
  width: 100%;
  height: 35px;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);

  &:focus {
    border-bottom: 2px solid var(--primary);
  }
}
</style>
