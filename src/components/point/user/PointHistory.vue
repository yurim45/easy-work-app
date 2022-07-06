<template>
  <ul>
    <li v-for="history in historyList" :key="history.id">
      <button
        type="button"
        @click="goToEditPoint(history)"
        :class="{ disabled: history.writer !== me.name }"
      >
        <span class="date">{{ date(history) }}</span>
        <div class="history">
          <div class="icon">{{ itemIcon(history.useItem) }}</div>
          <div class="historyDetail">
            <p
              v-if="history.useItem !== '보내기' && history.useItem !== '받기'"
            >
              {{ history.usePlace }}
            </p>
            <p v-else-if="history.useItem === '보내기'">보내기</p>
            <p v-else-if="history.useItem === '받기'">받기</p>
            <div class="users">
              <template v-for="(target, i) in history.targets" :key="i"
                ><span v-if="i < 3" class="target">{{
                  target
                }}</span> </template
              ><span v-if="history.targets.length > 3" class="targetOver"
                >(외 {{ history.targets.length - 3 }}명)</span
              >
            </div>
          </div>
        </div>
        <div class="amt">
          <div
            class="perAmount"
            :class="{ red: history.amount < '0', blue: history.amount > '0' }"
          >
            {{ perAmount(history) }} P
          </div>
          <div
            v-if="history.useItem !== '보내기' && history.useItem !== '받기'"
          >
            {{ amount(history) }} P
          </div>
        </div>
      </button>
    </li>
  </ul>
</template>

<script>
import { getNumFormat } from '@/util';
import { LIST } from '../common/RecordPorinsView.vue';
export default {
  name: 'PointHistory',
  data() {
    return {
      me: {
        name: 'April',
        point: 23000,
      },
      historyList: [
        {
          id: 1,
          writer: 'April',
          date: '2022-04-05',
          useItem: '식대초과',
          usePlace: '꼬기파티',
          targets: ['프릴', '워렌', '위드', '제임스', '주드'],
          amount: -3000,
        },
        {
          id: 2,
          writer: 'With',
          date: '2022-04-06',
          useItem: '식음료',
          usePlace: '치킨앤맥주',
          targets: ['제임스', '루니', '위드'],
          amount: -3000,
        },
        {
          id: 3,
          writer: 'April',
          date: '2022-04-07',
          useItem: '문화',
          usePlace: '탑건',
          targets: ['케빈', '찰스', '프릴', '제임스', '주드', '위드'],
          amount: -4000,
        },
        {
          id: 4,
          writer: 'With',
          date: '2022-04-10',
          useItem: '물품',
          usePlace: '물품 샀어요',
          targets: ['주드', '로이'],
          amount: -4000,
        },
        {
          id: 5,
          writer: 'April',
          date: '2022-04-11',
          useItem: '보내기',
          usePlace: '',
          targets: ['주드'],
          amount: -5000,
        },
        {
          id: 6,
          writer: 'Jude',
          date: '2022-04-20',
          useItem: '받기',
          usePlace: '',
          targets: ['헨리'],
          amount: 5000,
        },
      ],
    };
  },
  computed: {
    date: function () {
      return (history) => history.date.substring(5).replace('-', '.');
    },
    perAmount: function () {
      return (history) => getNumFormat(history.amount / history.targets.length);
    },
    amount: function () {
      return (history) => getNumFormat(history.amount);
    },
    itemIcon() {
      return (useItem) => {
        return [
          ...LIST,
          { value: '보내기', label: '보내기', icon: '💎' },
          { value: '받기', label: '받기', icon: '🎁' },
        ].filter((el) => el.value === useItem)[0]?.icon;
      };
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
  border-top: 5px solid var(--line);
}

li > button {
  @include flex(space-between);
  padding: 20px;
  width: 100%;
}

.history {
  display: flex;
  width: 65%;
}

.icon {
  @include flex;
  width: 50px;
  height: 40px;
  background: var(--lightGrey);
  font-size: 30px;
  border-radius: 50%;
}

.users {
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}

.historyDetail {
  @include flex(center, flex-start, column);
  width: 100%;
  padding-left: 20px;

  p {
    padding-bottom: 5px;
    font-weight: 600;
  }
}

.date {
  width: 50px;
  margin-right: 5px;
  font-size: 14px;
  font-weight: 600;
}

.target {
  margin-right: 6px;
  padding: 3px;
  @include stIcon;
  font-size: 11px;
}

.targetOver {
  color: var(--text-gray);
  font-size: 12px;
  letter-spacing: -0.8px;
}

.amt {
  @include flex(flex-start, flex-end, column);
  width: 100px;
  font-size: 14px;
  letter-spacing: -0.7px;
}

.perAmount {
  padding-bottom: 3px;
  font-size: 16px;
  font-weight: 800;
}

.red {
  color: var(--primary);
}

.blue {
  color: var(--blue);
}

.disabled {
  background: var(--lightGrey);
  color: var(--grey);
}

.disabled .red {
  background: var(--lightGrey);
  color: var(--grey);
}
</style>
