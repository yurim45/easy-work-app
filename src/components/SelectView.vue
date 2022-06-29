<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-model="seletedValue" @change="handleValue">
      <option v-bind:key="option.id" v-for="option in options">
        {{ option.text }}
      </option>
    </select>
    <span>▼</span>
  </div>
</template>

<script>
export default {
  name: 'SelectView',
  data() {
    return {
      seletedValue: '',
      options: [
        { id: 1, value: 1, text: '프릴' },
        { id: 2, value: 2, text: '제임스' },
        { id: 3, value: 3, text: '위드' },
        { id: 4, value: 4, text: '주드' },
        { id: 5, value: 5, text: '워렌' },
      ],
    };
  },
  props: {
    label: {
      type: String,
      default: '라벨',
    },
  },
  methods: {
    handleValue() {
      console.log(this.seletedValue);
    },
  },
};
</script>

<style scoped lang="scss">
label {
  margin-right: 50px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 10px;
}

select {
  width: 250px;
  height: 40px;
  padding: 10px 15px;
  border-bottom: 1px solid var(--line);

  &:focus {
    border-bottom: 2px solid var(--primary);
  }
}

span {
  position: relative;
  margin: -6.5px;
  color: var(--primary);
}
</style>
