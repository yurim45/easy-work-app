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
  @include flex(center, start, column);
}

label {
  @include stLabel;
}

input {
  @include stInput;
}
</style>
