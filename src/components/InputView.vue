<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" v-model.number="inputValue" @input="handleValue" />
  </div>
</template>

<script>
export default {
  name: 'InputView',
  data() {
    return {
      inputValue: '',
      label: '금액',
    };
  },
  methods: {
    handleValue() {
      console.log(this.inputValue);
    },
  },
};
</script>

<style scoped lang="scss">
label {
  margin-right: 50px;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 10px;
}

input {
  width: 250px;
  height: 40px;
  padding: 10px 15px;
  border-bottom: 1px solid var(--line);

  &:focus {
    border-bottom: 2px solid var(--primary);
  }
}
</style>
