<template>
  <div class="subTitle" @click="goToPage">
    <h3>{{ subTitle }}</h3>
    <icon-rignt-arrow />
  </div>
</template>

<script>
import router from '@/router';
import IconRigntArrow from '@/components/common/icons/IconRigntArrow.vue';

export default {
  name: 'SubTitle',
  components: { IconRigntArrow },
  props: {
    subTitle: String,
    url: String,
  },
  setup(props) {
    const goToPage = () => {
      router.push(props.url);
    };

    return { goToPage };
  },
};
</script>

<style lang="scss" scoped>
.subTitle {
  margin: 40px 0 20px;
  @include stLayout;
  @include flex(space-between);
  cursor: pointer;

  h3 {
    @include title800_20;
  }
}
</style>
