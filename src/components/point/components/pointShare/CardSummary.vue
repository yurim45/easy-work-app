<template>
  <div class="card" :class="{ black: type.includes('sp') }">
    <img alt="" src="@/assets/images/point/card.png" />
    <p v-if="type === 'arrive'" class="to">To. {{ to }}</p>
    <p v-if="type !== 'arrive'" class="to">포인트 발급</p>
    <div class="content">{{ body.content ?? '내용을 입력해주세요' }}</div>
    <p v-if="type === 'arrive'" class="from">Form. {{ from }}</p>
    <div class="amt">
      <strong>{{ point }}</strong> {{ pointName }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { getNumFormat, handleNametoUpperCase } from '@/util';

export default {
  name: 'CardSummary',
  props: {
    body: Object,
    type: String,
  },
  setup(props) {
    const point = computed(() => getNumFormat(props.body.point));
    const from = computed(() => handleNametoUpperCase(props.body.from));
    const to = computed(() => handleNametoUpperCase(props.body.to));
    const pointName = computed(() =>
      props.type.includes('sp') ? 'SP' : 'ATP'
    );

    return { point, from, to, pointName };
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  margin: 5px 0 30px;
  padding: 20px 22px;
  width: 100%;
  max-width: 600px;
  background: var(--blue500);
  color: var(--white);
  border-radius: 20px;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    right: 0;
    bottom: 0;
  }
}

.black {
  background: var(--black);
}

.to {
  @include title700_15;
}

.content {
  margin: 5px 0 13px;
  @include body400-13;
  opacity: 0.8;
}

.from {
  @include body700-11;
  opacity: 0.7;
}

.amt {
  margin-top: 37px;
  @include title700_15;
  text-align: right;

  strong {
    @include 특수800_34;
  }
}
</style>
