<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      v-model="iValue"
      @change="handleValue()"
      :placeholder="placeholder"
    />
    <ul v-if="isOpen" class="tagList">
      <li
        v-for="(value, i) in iValue"
        :key="i"
        class="tag"
        @click="deleteValue(value)"
      >
        {{ value }} X
      </li>
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
      iValue: [...this.inputValue],
      isOpen: false,
    };
  },
  watch: {
    iValue: function () {
      return (this.isOpen = this.iValue.length > 0 ? true : false);
    },
  },
  methods: {
    handleValue() {
      this.iValue = [...this.inputValue, this.iValue];
      this.$emit('handleValue', { name: this.name, value: this.iValue });
    },
    deleteValue(value) {
      this.iValue = this.iValue.filter((el) => el !== value);
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
  @include stLabel;
}

input {
  @include stInput;
}

.tagList {
  @include flex(center, start, row);
  margin: -10px 7px 30px;
}

.tag {
  @include stTag;
}
</style>
