<template>
  <div class="">
    <h1>Board</h1>
  </div>
</template>

<script>
import { watch, ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_GET_ALL_BOARDS } from '@/graphql/board';

export default {
  name: 'BoardView',
  setup() {
    const points = ref([]);

    const { result: boards } = useQuery(QUERY_GET_ALL_BOARDS);

    watch(boards, (value) => {
      points.value = value.getAllBoards.boards;
    });

    return { points };
  },
};
</script>

<style lang="scss" scoped></style>
