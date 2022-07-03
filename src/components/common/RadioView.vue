<template>
  <label v-for="item in items" v-bind:key="item.id" @change="handleValue">
    <input type="radio" :value="item.text" v-model="selectedValue" />{{
      item.text
    }}</label
  >
</template>

<script>
export default {
  name: 'RadioView',
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
  @include stLabel();
  accent-color: var(--primary);
}
</style>
