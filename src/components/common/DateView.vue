<template>
  <div class="date">
    <label v-if="label">{{ label }}</label>
    <input type="date" v-model="date" @input="handleValue()" />
  </div>
</template>

<script>
export default {
  name: 'DateView',
  props: {
    label: String,
    name: String,
    inputValue: String,
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      iName: this.name,
    };
  },
  methods: {
    handleValue() {
      this.$emit('handleValue', { name: this.iName, value: this.date });
    },
  },
};
</script>

<style scoped lang="scss">
.date {
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
}

label {
  font-size: 16px;
  font-weight: 600;
}

input {
  margin: 10px 0 20px;
  width: 100%;
  height: 40px;
  padding: 15px 10px 15px 15px;
  border: 1px solid var(--line);
  border-radius: 4px;

  &:focus {
    border: 2px solid var(--primary);
  }
}
</style>
