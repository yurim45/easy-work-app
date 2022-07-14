<template>
  <div class="select">
    <div class="textContainer">
      <strong class="label">{{ label }}</strong>
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
      @click="handleValue()"
      ref="multiselect"
      :disabled="isDisabled"
    />
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { USER_LIST } from '@/constants';

export default {
  name: 'SelectView',
  components: { Multiselect },
  props: {
    label: String,
    optionList: Object,
    name: String,
    mode: String,
    selectValue: [Array, String],
    placeholder: String,
    isDisabled: Boolean,
  },
  data() {
    return {
      sValue: this.selectValue,
      checkedAll: '',
    };
  },
  watch: {
    sValue() {
      if (this.sValue.length < USER_LIST.length) {
        this.checkedAll = false;
      } else if (this.sValue.length === USER_LIST.length) {
        this.checkedAll = true;
      }
    },
  },
  methods: {
    handleValue() {
      this.$emit('handleValue', { name: this.name, value: this.sValue });
    },
    selectAll() {
      if (this.checkedAll) {
        this.$refs.multiselect.selectAll();
        this.$emit('handleValue', { name: this.name, value: this.sValue });
      } else {
        this.$refs.multiselect.clear();
        this.$emit('handleValue', { name: this.name, value: this.sValue });
      }
    },
  },
};
</script>

<style src="./default.css"></style>

<style scoped lang="scss">
.select {
  margin-bottom: 20px;
}

.textContainer {
  @include flex(space-between);

  label {
    @include flex;
    margin-right: 0;
    font-size: 14px;
  }
}

.label {
  margin-bottom: 10px;
  @include stLabel;
}
</style>
