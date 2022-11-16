<template>
  <div class="inner">
    <p class="title">{{ title }}</p>
    <div v-if="boxData" class="boxData">
      <strong>반려사유</strong>
      <p>{{ boxData }}</p>
    </div>
    <ul>
      <li
        v-for="(item, i) in data"
        :key="i"
        :class="{ line: i < data.length - 1 }"
      >
        <div class="innerleft">{{ item.text }}</div>
        <div>{{ item.value }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: 'ModalInner',
  props: {
    title: String,
    data: Array,
    boxData: String,
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
.inner {
  width: 100%;
}

.title {
  margin-bottom: 24px;
  @include title700_17;
  text-align: center;
  overflow: hidden;
  white-space: normal;
  word-break: keep-all;
}

.boxData {
  margin-bottom: 14px;
  padding: 14px;
  background: var(--line);
  border-radius: 10px;
  text-align: center;

  strong {
    margin-bottom: 2px;
    @include body600_14;
  }

  p {
    @include body400_14;
  }
}

li {
  padding: 8px 0;
  @include flex(space-between);
  @include body500_13;

  :first-child {
    width: 35%;
    margin-right: 30px;
  }

  :last-child {
    text-align: right;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
}

.line {
  border-bottom: 1px solid var(--line);
}
</style>
