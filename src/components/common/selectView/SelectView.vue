<template>
  <div>
    <div class="textContainer">
      <label class="label">{{ label }}</label>
      <label @change="selectAll" v-if="mode === 'single' ? false : true">
        <input type="checkbox" v-model="checkedAll" :value="sValue" />
        전체선택
      </label>
    </div>
    <Multiselect
      v-model="sValue"
      :options="optionList"
      :placeholder="placeholder"
      :mode="mode"
      @select="handleValue()"
    />
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';

export default {
  name: 'SelectView',
  components: { Multiselect },
  props: {
    label: String,
    optionList: Object,
    name: String,
    mode: String,
    selectValue: String,
    placeholder: String,
  },
  data() {
    return {
      sValue: this.selectValue,
      checkedAll: '',
    };
  },
  methods: {
    handleValue() {
      console.log({ name: this.name, value: this.sValue }, this.selectValue);
      this.$emit('handleValue', { name: this.name, value: this.sValue });
    },
    selectAll() {
      if (this.checkedAll) {
        this.sValue = this.optionList;
      } else {
        this.sValue = [];
      }
      console.log('====openList', this.checkedAll, this.selectValue);
    },
  },
};
</script>

<style scoped lang="scss">
.textContainer {
}

label {
  font-size: 16px;
  font-weight: 600;
}
</style>
