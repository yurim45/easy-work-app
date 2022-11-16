<template>
  <close-header @click="goToHome" />
  <main>
    <h2>알림</h2>
    <ul>
      <li
        :class="{ check: message.isCheck }"
        v-for="message in messageData"
        :key="message.id"
        @click="goToPage(message)"
      >
        <div class="icon" v-if="message.category !== 'Admin'">
          {{ getCategory(message.category) }}
        </div>
        <div class="iconblue" v-if="message.category === 'Admin'">
          {{ getCategory(message.category) }}
        </div>
        <p>{{ message.text }}</p>
        <span class="date">{{ getDate(message) }}</span>
      </li>
    </ul>
  </main>
</template>

<script>
import { onMounted, watch, ref } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { QUERY_MESSAGE_LIST, MUTATION_CHECK_MESSAGE } from '@/graphql/index.js';
import router from '@/router';
import CloseHeader from '@/components/common/header/CloseHeader.vue';
import { dateFormatFull } from '@/util';

export default {
  components: { CloseHeader },
  name: 'NewsView',
  setup() {
    const messageId = ref(null);
    const messageData = ref([]);

    const { result, refetch } = useQuery(QUERY_MESSAGE_LIST);

    onMounted(() => {
      refetch();
      handleMessageList();
    });

    watch(result, () => {
      handleMessageList();
    });

    const handleMessageList = () => {
      if (result.value) {
        messageData.value = result.value?.getMessageList.messageList;
      }
    };

    const getDate = (data) => {
      return dateFormatFull(data.updatedAt);
    };

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
          router.push({
            path: '/item/detail',
            query: { id: message.sourceId },
          });
          return;
        case 'Admin':
          if (message.text.inclueds('구매')) {
            router.push({
              path: '/admin/supply',
              query: { id: message.sourceId },
            });
            return;
          }
          if (message.text.inclueds('휴가')) {
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

    const goToHome = () => {
      router.push('/');
    };

    return { messageData, goToHome, goToPage, getDate, getCategory };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  @include stLayout;
  @include stPageTitle;
}

li {
  padding: 12px 30px;
  border-bottom: 1px solid var(--line);
  background: var(--blue100);
}

.check {
  background: var(--white);
}

.icon {
  display: inline-block;
  margin-top: 4px;
  padding: 2px 6px;
  background: var(--orange500);
  color: var(--white);
  @include body700_11;
  border-radius: 5px;
}

.iconblue {
  display: inline-block;
  margin-top: 4px;
  padding: 2px 6px;
  background: var(--blue500);
  color: var(--white);
  @include body700_11;
  border-radius: 5px;
}

p {
  margin-top: 6px;
  @include body600_15;
}

.date {
  color: var(--gray999);
  @include body400_13;
}
</style>
