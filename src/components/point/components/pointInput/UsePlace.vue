<template>
  <basic-input
    label="사용처"
    placeholder="사용처를 입력하세요"
    name="placeName"
    :handleValue="searchValue"
    :value="value"
  />
  <ul v-if="isView" class="list">
    <li
      v-for="(list, i) in searchList"
      :key="i"
      @click="handleSelectedValue(list)"
    >
      {{ list }}
    </li>
  </ul>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_PLACE_LIST } from '@/graphql/point';
import { BasicInput } from '@/components/common/index.js';

export default {
  name: 'UsePlace',
  components: { BasicInput },
  props: {
    value: {
      type: String,
    },
    handleValue: Function,
  },
  setup(props) {
    const isView = ref(false);
    const searchKeyword = ref(null);
    const searchList = ref([]);

    const { result } = useQuery(QUERY_PLACE_LIST, {
      seachTerm: searchKeyword,
    });

    onMounted(() => {});

    watch(result, () => {
      if (result.value) {
        searchList.value = result.value.placeList.placeList.map(
          (item) => item.name
        );
        if (searchList.value.length === 0) {
          isView.value = false;
        } else {
          isView.value = true;
        }
      }
    });

    const searchValue = (_, value) => {
      if (props.value && props.value === value) return;

      searchKeyword.value = value;
      props.handleValue('placeName', value);
    };

    const handleSelectedValue = (value) => {
      props.handleValue('placeName', value);
      searchList.value = [];
      isView.value = false;
    };

    return {
      isView,
      searchList,
      handleSelectedValue,
      searchValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.list {
  position: absolute;
  width: calc(100% - 60px);
  max-width: 540px;
  max-height: 200px;
  margin-top: -25px;
  padding: 0 14px;
  background: var(--white);
  border: 1px solid var(--inputLine);
  border-radius: 7px;
  overflow: scroll;
  z-index: 100;

  li {
    margin: 15px 0;
    @include body600_14;
  }
}
</style>
