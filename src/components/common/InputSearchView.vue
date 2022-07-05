<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      v-model="iValue"
      @input="handleValue()"
      :placeholder="placeholder"
    />
    <ul v-if="isOpen">
      <li v-for="(value, i) in iValue" :key="i">{{ value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InputSearchView',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: String,
    name: String,
    placeholder: String,
    inputValue: [Array],
  },
  data() {
    return {
      iValue: this.inputValue,
      isOpen: true,
      searchValue: [],
    };
  },
  methods: {
    handleValue() {
      this.$emit('handleSearchValue', { name: this.name, value: this.iValue });
    },
  },
};
</script>

<style scoped lang="scss">
div {
  @include flex(center, start, column);
}

label {
  @include stLabel;
}

input {
  @include stInput;
}
</style>
