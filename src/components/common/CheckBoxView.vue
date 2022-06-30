<template>
  <label v-for="item in items" :key="item.id" @change="handleValue">
    <input type="checkbox" :value="item.text" v-model="checkedValue" />{{
      item.text
    }}</label
  >
</template>

<script>
export default {
  name: 'CheckBoxView',
  data() {
    return {
      checkedValue: [],
      items: [
        { id: 1, value: 1, text: '프릴' },
        { id: 2, value: 2, text: '제임스' },
        { id: 3, value: 3, text: '위드' },
        { id: 4, value: 4, text: '주드' },
        { id: 5, value: 5, text: '워렌' },
      ],
    };
  },
  methods: {
    handleValue() {
      console.log(this.checkedValue);
    },
  },
  // props: {
  //   items: {
  //     type: Array,
  //     default: [
  //       { id: 1, value: 1, text: '프릴' },
  //       { id: 2, value: 2, text: '제임스' },
  //       { id: 3, value: 3, text: '위드' },
  //       { id: 4, value: 4, text: '주드' },
  //       { id: 5, value: 5, text: '워렌' },
  //     ],
  //   },
  // },
};
</script>

<style scoped lang="scss">
label {
  margin: 0 10px;
  font-size: 18px;
  accent-color: var(--primary);

  input[type='checkbox'] {
    -webkit-appearance: none;
    position: relative;
    width: 16px;
    height: 16px;
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 2px;
    cursor: pointer;
  }

  input[type='checkbox']::before {
    content: '\2713';
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: hidden;
    transform: scale(0) translate(-50%, -50%);
    line-height: 1;
  }

  input[type='checkbox']:hover {
    border-color: var(--primary);
  }

  input[type='checkbox']:checked {
    background-color: var(--primary);
    border-color: rgba(255, 255, 255, 0.3);
    color: var(--white);
  }

  input[type='checkbox']:checked::before {
    border-radius: 2px;
    transform: scale(1) translate(-50%, -50%);
  }
}
</style>
