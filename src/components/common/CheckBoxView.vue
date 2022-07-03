<template>
  <div class="label">{{ label }}</div>
  <label v-for="item in items" :key="item.id" @change="handleValue">
    <input type="checkbox" :value="item.text" v-model="checkedValue" />
    {{ item.text }}
  </label>
</template>

<script>
export default {
  name: 'CheckBoxView',
  props: {
    label: String,
    items: Object,
  },
  data() {
    return {
      checkedValue: [],
    };
  },
  methods: {
    handleValue() {
      console.log(this.checkedValue);
    },
  },
};
</script>

<style scoped lang="scss">
.label {
  @include stLabel();
}
</style>
