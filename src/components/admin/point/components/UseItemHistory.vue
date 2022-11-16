<template>
  <section class="section" :class="{ isTitle: isTitle }">
    <sub-title
      v-if="isTitle"
      subTitle="항목별 사용내역"
      :url="`/admin/point/item-detail?code=${state[0]?.name}`"
    />
    <horizontal-scroll>
      <ul>
        <li
          v-for="v in state"
          :key="v.name"
          @click="goToPage(v.name)"
          :class="{ active: code === v.name }"
        >
          <icon-food v-if="v.name === 'Together' && code !== 'Together'" />
          <icon-food-white
            v-if="v.name === 'Together' && code === 'Together'"
          />
          <icon-food v-if="v.name === 'ExceedMeal' && code !== 'ExceedMeal'" />
          <icon-food-white
            v-if="v.name === 'ExceedMeal' && code === 'ExceedMeal'"
          />
          <icon-drink v-if="v.name === 'Snacks' && code !== 'Snacks'" />
          <icon-drink-white v-if="v.name === 'Snacks' && code === 'Snacks'" />
          <icon-culture v-if="v.name === 'Culture' && code !== 'Culture'" />
          <icon-culture-white
            v-if="v.name === 'Culture' && code === 'Culture'"
          />
          <icon-box v-if="v.name === 'Item' && code !== 'Item'" />
          <icon-box-white v-if="v.name === 'Item' && code === 'Item'" />
          <p>{{ getName(v.name) }}</p>
          <strong>{{ getFormat(v.price) }} ATP</strong>
        </li>
      </ul>
    </horizontal-scroll>
  </section>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_POINT_REPORT } from '@/graphql/point';
import router from '@/router/index.js';
import { SubTitle, HorizontalScroll } from '@/components/common/index.js';
import {
  IconFood,
  IconBox,
  IconDrink,
  IconCulture,
  IconFoodWhite,
  IconBoxWhite,
  IconDrinkWhite,
  IconCultureWhite,
} from './icons/index.js';
import { getNumFormat } from '@/util/index.js';
import { ITEM_CODE } from '@/constants/index.js';

export default {
  name: 'UseItemHistory',
  components: {
    SubTitle,
    HorizontalScroll,
    IconFood,
    IconBox,
    IconDrink,
    IconCulture,
    IconFoodWhite,
    IconBoxWhite,
    IconDrinkWhite,
    IconCultureWhite,
  },
  props: {
    isTitle: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      default: null,
    },
    data: {
      type: Object,
    },
    type: {
      type: String,
      default: 'atp',
    },
  },
  setup(props) {
    const state = ref([]);

    const code = ref(null);

    const { result, refetch } = useQuery(QUERY_POINT_REPORT, {
      useItemCategory: ['ExceedMeal', 'Snacks', 'Culture', 'Item'],
    });

    onMounted(() => {
      refetch();

      if (result.value) {
        handleData();
      }

      if (!props.isTitle) {
        code.value = 'ExceedMeal';
      }
    });

    watch(result, () => {
      handleData();
    });

    const handleData = () => {
      state.value = result.value.getPointReport.result.filter(
        (v) =>
          v.name === 'ExceedMeal' ||
          v.name === 'Snacks' ||
          v.name === 'Culture' ||
          v.name === 'Item'
      );
      if (props.type === 'atp') {
        state.value.sort((a, b) => a.price - b.price);
      }
      if (props.type === 'sp') {
        state.value = state.value.map((v) => {
          return {
            ...v,
            price: 0,
          };
        });
      }
    };

    const getFormat = (data) => {
      return getNumFormat(data);
    };

    const getName = (data) => {
      return ITEM_CODE[data];
    };

    const goToPage = (code) => {
      router.push({
        path: '/admin/point/item-detail',
        query: { code, type: props.type },
      });
    };

    return { state, getFormat, getName, goToPage };
  },
};
</script>

<style lang="scss" scoped>
.active {
  background: var(--blue500);
  color: var(--white);
}

.isTitle {
  margin: 50px 0 40px;
}

.section {
  div {
    @include stLayout;
  }
}

ul {
  @include stLayout;
  @include flex(flex-start);
}

li {
  width: 145px;
  height: 129px;
  margin-right: 12px;
  padding: 20px 20px 18px;
  background: var(--blue200);
  border-radius: 20px;

  p {
    margin-top: 22px;
    @include body500_13;
  }

  strong {
    @include title700_15;
  }
}
</style>
