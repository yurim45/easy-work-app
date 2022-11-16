<template>
  <section class="horizontal">
    <slot></slot>
  </section>
</template>

<script>
import { onMounted, onUnmounted, watch, ref } from 'vue';
import { throttle } from 'lodash';

export default {
  name: 'InfiniteScroll',
  components: {},
  props: {
    page: Number,
    take: Number,
    handleData: Function,
    handlePage: Function,
  },
  setup(props) {
    const pageData = ref(null);
    const takeData = ref(null);

    onMounted(() => {
      pageData.value = props?.page;
      takeData.value = props?.take;

      window.addEventListener('scroll', handleInfiniteScroll);
    });

    onUnmounted(() =>
      window.removeEventListener('scroll', handleInfiniteScroll)
    );

    watch(props, () => {
      pageData.value = props.page;
      takeData.value = props.take;
    });

    const handleInfiniteScroll = throttle(() => {
      const { documentElement, body } = document;
      const scrollHeight = Math.max(
        documentElement.scrollHeight,
        body.scrollHeight
      );
      const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
      const clientHeight = documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        pageData.value = pageData.value + 1;
        props.handlePage(pageData.value, takeData.value);
      }
      props.handleData();
    }, [500]);
  },
};
</script>

<style lang="scss" scoped>
.horizontal {
  @include flex(flex-start);
  margin: auto;
  overflow: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
