<template>
  <div class="arrive">
    <h3 v-if="type === 'arrive'">{{ to }} 에게 <br />{{ title }}</h3>
    <h3 v-if="type !== 'arrive'">포인트가 발급되었습니다.</h3>
    <card-summary :body="state" :type="type" />
    <div class="button"><basic-button @click="$emit('onclick')" /></div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import CardSummary from './pointShare/CardSummary.vue';
import BasicButton from '../../common/button/BasicButton.vue';
import { handleNametoUpperCase } from '@/util';

export default {
  components: { CardSummary, BasicButton },
  name: 'SendPoint',
  props: {
    type: String,
    body: Object,
  },
  setup(props) {
    const title = ref('포인트 선물을 보냈습니다.');
    const state = ref({});

    onMounted(() => {
      if (props.type === 'arrive') {
        title.value = `포인트 선물이 도착했어요.`;
      }

      if (props.body) {
        state.value = props.body;
      }
    });

    watch(props, () => {
      state.value = props.body;
    });

    const to = computed(() =>
      props.type === 'arrive'
        ? handleNametoUpperCase(state.value.from)
        : handleNametoUpperCase(state.value.to)
    );

    return { state, to, title, onclick };
  },
};
</script>

<style lang="scss" scoped>
.arrive {
  @include flex(center, center, column);
  @include stLayout;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 300;

  h3 {
    margin-bottom: 20px;
    color: var(--white);
    @include title800_20;
    text-align: center;
  }
}

@media arrive and (max-width: 400px) {
  .modalBg {
    padding: 30px 30px 100px;
  }
}

.button {
  button {
    width: 90px;
  }
}
</style>
