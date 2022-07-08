<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :value="iValue"
      @keyup="debounceHandleValue($event)"
      @keyup.enter="selectValue($event.target.value)"
      :placeholder="placeholder"
    />
    <ul class="filterList" v-if="isListOpen">
      <li
        v-for="(value, i) in filteredList"
        :key="i"
        @click="selectValue(value)"
      >
        {{ value }}
      </li>
    </ul>
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
    list: Array,
  },
  data() {
    return {
      iValue: '',
      resultValue: [...this.inputValue],
      filteredList: [],
      isListOpen: false,
    };
  },
  computed: {
    isOpen() {
      return this.resultValue.length > 0 ? true : false;
    },
  },
  methods: {
    debounceHandleValue: debounce(function (event) {
      if (!event?.target?.value) return;
      this.iValue = event?.target?.value;
      this.filteredList = this.list?.filter((el) => el.includes(this.iValue));
      this.isListOpen = this.filteredList.length > 0;
    }, 500),

    selectValue(value) {
      if (!value) return;
      this.resultValue = [...this.resultValue, value].filter(
        (v, i, self) => self.indexOf(v) === i
      );
      this.$emit('handleValue', {
        name: this.name,
        value: this.resultValue,
      });
      this.iValue = '';
      this.isListOpen = false;
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

.filterList {
  margin-top: -15px;
  width: 100%;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 4px;
  z-index: 100;

  li {
    padding: 15px;
    font-size: 14px;
    border-bottom: 0.5px solid var(--line);
  }
}
</style>
