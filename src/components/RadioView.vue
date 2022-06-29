<template>
  <label v-for="item in items" v-bind:key="item.id" @change="handleValue">
    <input type="radio" :value="item.text" v-model="selectedValue" />{{
      item.text
    }}</label
  >
</template>

<script>
export default {
  name: 'radioView',
  data() {
    return {
      selectedValue: '',
      items: [
        { id: 1, value: 1, text: '프릴' },
        { id: 2, value: 2, text: '제임스' },
        { id: 3, value: 3, text: '위드' },
        { id: 4, value: 4, text: '주드' },
        { id: 5, value: 5, text: '워렌' },
      ],
      label: '금액',
    };
  },
  methods: {
    handleValue() {
      console.log(this.selectedValue);
    },
  },
};
</script>

<style scoped lang="scss">
label {
  margin-right: 10px;
  font-size: 16px;
  accent-color: var(--primary);

  input[type='radio'] {
    -webkit-appearance: none;
    position: relative;
    width: 16px;
    height: 16px;
    background: var(--white);
    border: 2px solid var(--line);
    border-radius: 50%;
    cursor: pointer;
  }

  input[type='radio']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: hidden;
    transform: scale(0) translate(-50%, -50%);
    line-height: 1;
  }

  input[type='radio']:hover {
    border-color: var(--primary);
  }

  input[type='radio']:checked {
    border: 5px solid var(--primary);
    border-radius: 100%;
  }

  input[type='radio']:checked::before {
    border-radius: 2px;
    transform: scale(1) translate(-50%, -50%);
  }
}
</style>
