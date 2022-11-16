<template>
  <div class="empty">
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M40 78.5C61.263 78.5 78.5 61.263 78.5 40C78.5 18.737 61.263 1.5 40 1.5C18.737 1.5 1.5 18.737 1.5 40C1.5 61.263 18.737 78.5 40 78.5ZM40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z"
        fill="#C5C5C5"
      />
      <rect x="39" y="18" width="2" height="34" rx="1" fill="#C5C5C5" />
      <circle cx="40" cy="61" r="2" fill="#C5C5C5" />
    </svg>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'EmptyView',
  props: {
    text: String,
  },
};
</script>

<style lang="scss" scoped>
.empty {
  @include flex(center, center, column);
  margin: 60px 0;

  p {
    margin-top: 14px;
    @include body400_14;
    color: var(--gray999);
  }
}
</style>
