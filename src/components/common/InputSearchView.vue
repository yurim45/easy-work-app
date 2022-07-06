<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :value="iValue"
      @keyup="debounceHandleValue($event)"
      :placeholder="placeholder"
    />
    <ul v-if="isOpen" class="tagList">
      <li
        v-for="(value, i) in resultValue"
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
import { debounce } from 'lodash';

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
      iValue: '',
      resultValue: [...this.inputValue],
    };
  },
  computed: {
    isOpen() {
      return this.resultValue.length > 0 ? true : false;
    },
  },
  methods: {
    debounceHandleValue() {
      debounce(function (event) {
        this.resultValue = [...this.resultValue, event.target.value];
        this.$emit('handleValue', {
          name: this.name,
          value: this.resultValue,
        });
        this.iValue = '';
      }, 800);
    },

    deleteValue(value) {
      this.resultValue = this.resultValue.filter((el) => el !== value);
      this.$emit('handleValue', { name: this.name, value: this.resultValue });
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
  @include flex(flex-start, start, row);
  flex-wrap: wrap;
  margin: -10px 7px 30px;
  width: 100%;
}

.tag {
  @include stTag;
}
</style>
