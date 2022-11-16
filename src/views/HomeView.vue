<template>
  <basic-header :isAdmin="false" :isAlertOn="isAlertOn" />
  <main class="home">
    <!-- <button v-if="permission === 'default'" @click="askNotiPermission">
      알림수신
    </button>
    <button v-else-if="permission === 'denied'">알림 거절됨</button>
    <button type="button" v-else @click="alimTest">테스트 알림</button> -->
    <home-news :data="messageData" v-if="messageData?.length > 0" />
    <home-my-info />
    <home-day-off />
    <home-point />
    <home-item />
    <home-vote />
    <home-gacha />
    <home-board />
    <home-daily-menu />
  </main>
  <footer>
    <home-to-top-button />
  </footer>
</template>

<script>
import { onMounted, watch, ref } from 'vue';
import store from '@/store/index';
import { useQuery } from '@vue/apollo-composable';
import {
  QUERY_ALL_USERS,
  QUERY_MY,
  QUERY_MESSAGE_LIST,
} from '@/graphql/index.js';
import { BasicHeader, HomeToTopButton } from '@/components/common/index.js';
import {
  HomeNews,
  HomeMyInfo,
  HomeDayOff,
  HomePoint,
  HomeVote,
  HomeGacha,
  HomeBoard,
  HomeDailyMenu,
  HomeItem,
} from '@/components/home/index.js';

export default {
  components: {
    BasicHeader,
    HomeNews,
    HomeMyInfo,
    HomeDayOff,
    HomePoint,
    HomeVote,
    HomeGacha,
    HomeBoard,
    HomeDailyMenu,
    HomeToTopButton,
    HomeItem,
  },
  name: 'HomeView',
  setup() {
    const isAlertOn = ref(false);
    const messageData = ref([]);
    const permission = ref(null);

    const { result, refetch: reAllUsers } = useQuery(QUERY_ALL_USERS);
    const { result: my } = useQuery(QUERY_MY);
    const { result: messageList, refetch } = useQuery(QUERY_MESSAGE_LIST);

    onMounted(() => {
      refetch();
      reAllUsers();
      handleMessageList();
      // if ('Notification' in window && 'serviceWorker' in navigator) {
      //   permission.value = Notification.permission;
      //   if (permission.value === 'granted') {
      //     alimTest();
      //   }
      // }
    });

    watch(result, () => {
      if (result.value) {
        store.dispatch('getAllusers', {
          allusers: result.value.allUsers.users,
        });
      }
    });

    watch(my, () => {
      if (my.value) {
        store.dispatch('getMyInfo', {
          my: my.value.my.my,
        });
      }
    });

    watch(messageList, () => {
      handleMessageList();
    });

    const handleMessageList = () => {
      if (messageList.value) {
        messageData.value =
          messageList.value?.getMessageList.messageList?.filter(
            (v) => !v.isCheck
          );
        isAlertOn.value =
          messageList.value?.getMessageList.messageList?.filter(
            (v) => !v.isCheck
          )?.length > 0;
      }
    };

    // const askNotiPermission = () => {
    //   Notification.requestPermission((result) => {
    //     if (result === 'granted') {
    //       console.log(result);
    //     }
    //     permission.value = result;
    //   });
    // };

    // const alimTest = () => {
    //   const title = messageData.value[0]?.text ?? 'Easywork Test';
    //   const options = {
    //     body: messageData.value[0]?.text ?? '테스트 알림입니다.',
    //   };

    //   new Notification(title, options);
    // };

    return {
      store,
      permission,
      isAlertOn,
      messageData,
    };
  },
};
</script>
