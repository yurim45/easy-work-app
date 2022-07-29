<template>
  <ul>
    <li v-for="history in historyList" :key="history.id">
      <button
        type="button"
        @click="goToEditPoint(history)"
        :class="{ disabled: isEditDisabled(history) }"
        :disabled="isEditDisabled(history)"
      >
        <div class="date">{{ date(history) }}</div>
        <div class="content">
          <div class="history">
            <p
              v-if="history.useItem !== '보내기' && history.useItem !== '받기'"
            >
              {{ history.usePlace }}
            </p>
            <p v-else-if="history.useItem === '보내기'">보내기</p>
            <p v-else-if="history.useItem === '받기'">받기</p>
            <div
              class="contentBottom"
              v-if="history.useItem !== '보내기' && history.useItem !== '받기'"
            >
              <span>{{ history.useItem }}</span>
              <svg
                width="2"
                height="2"
                viewBox="0 0 2 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="1" cy="1" r="1" fill="#888888" />
              </svg>
              <span class="users">{{ users(history) }}명</span>
            </div>
          </div>
          <div class="amt">
            <div
              class="perAmount"
              :class="{ red: history.amount < '0', blue: history.amount > '0' }"
            >
              {{ perAmount(history) }}
            </div>
            <div
              v-if="history.useItem !== '보내기' && history.useItem !== '받기'"
            >
              {{ amount(history) }}
            </div>
          </div>
        </div>
      </button>
    </li>
  </ul>
</template>

<script>
import { getNumFormat } from '@/util';
import { ITEM_LIST, POINT_HISTORY, MY_INFO } from '@/constants';

export default {
  name: 'HomePointHistory',
  data() {
    return {
      me: {},
      historyList: [],
    };
  },
  mounted() {
    this.me = MY_INFO;
    this.historyList = POINT_HISTORY;
  },
  computed: {
    date() {
      return (history) => history.date.substring(5).replace('-', '.');
    },
    perAmount() {
      return (history) => {
        if (['보내기', '받기']?.includes(history.useItem)) {
          return getNumFormat(history.amount / history.targets.length);
        } else {
          return getNumFormat(
            history.amount /
              (history.targets.length + history.excludedTargets.length)
          );
        }
      };
    },
    amount() {
      return (history) => getNumFormat(history.amount);
    },
    users() {
      return (history) =>
        history.targets?.length + history.excludedTargets?.length;
    },
    itemIcon() {
      return (useItem) => {
        return [
          ...ITEM_LIST,
          { value: '보내기', label: '보내기', icon: '💎' },
          { value: '받기', label: '받기', icon: '🎁' },
        ].filter((el) => el.value === useItem)[0]?.icon;
      };
    },
    isEditDisabled() {
      return (history) =>
        history.writer !== this.me?.nick || history.useItem === '보내기';
    },
  },
  methods: {
    goToEditPoint(history) {
      if (history.writer === this.me.name) {
        this.$router.push({
          name: 'pointRecord',
          params: history,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  margin-top: 20px;
  font-size: 16px;
}

li {
  border-bottom: 1px solid #ededed;
}

li > button {
  @include flex(center, start, column);
  padding: 18px 0;
  width: 100%;
}

.date {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
}

.content {
  @include flex(space-between);
  width: 100%;
}

.history {
  text-align: left;
}

.contentBottom {
  margin-top: 5px;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #888888;

  svg {
    margin: 5px;
  }
}

.amt {
  width: 50%;
  color: #888888;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  text-align: right;
}

.perAmount {
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
}

.red {
  color: var(--primary);
}

.blue {
  color: var(--blue);
}

.disabled {
  color: var(--grey);
}

.disabled .red {
  color: var(--grey);
}
</style>
