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
  @include flex(center, start, column);
}

label {
  @include stLabel();
}

input {
  @include stInput();
}
</style>
