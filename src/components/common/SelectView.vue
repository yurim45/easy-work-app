<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-model="sValue" @change="handleValue()">
      <option value="" disabled selected>{{ placeholder }}</option>
      <option v-bind:key="option.id" v-for="option in options">
        {{ option.text }}
      </option>
    </select>
    <span>▼</span>
    <!-- <span class="placeholder">{{ placeholder }}</span> -->
  </div>
</template>

<script>
export default {
  name: 'SelectView',
  props: {
    label: String,
    optionList: Object,
    name: String,
    selectValue: String,
    placeholder: String,
  },
  data() {
    return {
      seletedValue: '',
      options: this.optionList,
      sValue: this.selectValue,
      sName: this.name,
    };
  },

  methods: {
    handleValue() {
      this.$emit('handleValue', { name: this.sName, value: this.sValue });
    },
  },
};
</script>

<style scoped lang="scss">
div {
  height: 51px;
}

label {
  font-size: 16px;
  font-weight: 600;
}

select {
  width: 100%;
  height: 35px;
  padding: 10px 0 0;
  border-bottom: 1px solid var(--line);

  &:focus {
    border-bottom: 2px solid var(--primary);
  }
}

span {
  position: relative;
  top: -25px;
  left: 95%;
  color: var(--primary);
  opacity: 0.4;
}

.placeholder {
  top: -22px;
  left: 0;
  color: var(--text-999);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.2px;
  opacity: 1;
}
</style>
