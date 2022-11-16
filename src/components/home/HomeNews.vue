<template>
  <section>
    <ul>
      <template v-for="(message, i) in data" :key="message.id">
        <li v-if="i < 3" @click="goToPage(message)">
          <span class="icon" v-if="message.category !== 'Admin'">{{
            getCategory(message.category)
          }}</span>
          <span class="iconblue" v-if="message.category === 'Admin'">{{
            getCategory(message.category)
          }}</span>
          <p>{{ message.text }}</p>
        </li></template
      >
    </ul>
    <div v-if="data?.length > 3" class="news">
      <basic-button label="More >" @onClick="goToNews" />
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useMutation } from '@vue/apollo-composable';
import { MUTATION_CHECK_MESSAGE } from '@/graphql/index.js';
import { BasicButton } from '@/components/common/index.js';
import router from '@/router';

export default {
  name: 'HomeNews',
  components: { BasicButton },
  props: {
    data: Array,
  },
  setup() {
    const store = useStore();

    const messageId = ref(null);

    onMounted(() => {});

    const { mutate: checkMessage } = useMutation(
      MUTATION_CHECK_MESSAGE,
      () => ({
        variables: {
          messageId: messageId.value,
        },
      })
    );

    const goToPage = (message) => {
      messageId.value = message.id;

      if (!message.isCheck) {
        checkMessage().catch((e) => {
          console.log(e);
        });
      }
      switch (message.category) {
        case 'Dayoff':
          router.push({
            path: '/day-off/detail',
            query: { id: message.sourceId },
          });
          return;
        case 'Point':
          router.push({
            path: '/point',
            query: { id: message.sourceId, messageId: message.id },
          });
          return;
        case 'Purchase':
          if (message.text.includes('승인된')) {
            router.push({
              path: '/item/detail',
              query: { id: message.sourceId, isAdmin: true },
            });
            return;
          } else {
            router.push({
              path: '/item/detail',
              query: { id: message.sourceId },
            });
            return;
          }
        case 'Admin':
          if (message.text.includes('구매')) {
            router.push({
              path: '/admin/supply',
              query: { id: message.sourceId },
            });
            return;
          }
          if (message.text.includes('휴가')) {
            router.push({
              path: '/admin/day-off',
              query: { id: message.sourceId },
            });
            return;
          }
      }
    };

    const getCategory = (data) => {
      if (data === 'Purchase') {
        return 'Supply';
      } else {
        return data;
      }
    };

    const goToNews = () => {
      router.push('/news');
    };

    return { store, goToPage, getCategory, goToNews };
  },
};
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

section {
  padding: 20px 0 10px 30px;
}

li {
  @include flex(flex-start);
  margin-bottom: 12px;
  padding: 16px 20px;
  background: var(--white);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  border-radius: 25px 0px 0px 25px;
  position: relative;
  animation: fadeIn 0.5s;
}

.icon {
  margin-right: 6px;
  padding: 2px 6px;
  background: var(--orange500);
  color: var(--white);
  @include body700_11;
  border-radius: 5px;
}

.iconblue {
  margin-right: 6px;
  padding: 2px 6px;
  background: var(--blue500);
  color: var(--white);
  @include body700_11;
  border-radius: 5px;
}

p {
  @include body700_14;
}

.news {
  @include flex;
  margin-top: 28px;
  padding-right: 30px;

  button {
    width: 79px;
    height: 30px;
    @include body500_13;
    border-radius: 111px;
  }
}
</style>
