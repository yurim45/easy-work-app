<template>
  <ul>
    <li v-for="history in historyList" :key="history.id">
      <span class="date">{{ date(history) }}</span>
      <div class="history">
        <div class="icon">{{ history.useItem.icon }}</div>
        <div class="historyDetail">
          <p>{{ history.usePlace }}</p>
          <div class="users">
            <template v-for="(target, i) in history.targets" :key="i"
              ><span v-if="i < 3" class="target">{{ target }}</span> </template
            ><span v-if="history.targets.length > 3" class="targetOver"
              >(외 {{ history.targets.length - 3 }}명)</span
            >
          </div>
        </div>
      </div>
      <div class="amt">
        <div class="perAmount">{{ perAmount(history) }} P</div>
        <div>{{ amount(history) }} P</div>
      </div>
    </li>
  </ul>
</template>

<script>
import { getNumFormat } from '@/util';
export default {
  name: 'PointHistory',
  data() {
    return {
      historyList: [
        {
          id: 1,
          date: '2022-04-05',
          useItem: { icon: '🍚', value: '식대초과' },
          usePlace: '꼬기파티',
          targets: ['프릴', '워렌', '위드', '제임스', '주드'],
          amount: -3000,
        },
        {
          id: 2,
          date: '2022-04-06',
          useItem: { icon: '🍻', value: '식음료' },
          usePlace: '치킨앤맥주',
          targets: ['제임스', '주드', '위드'],
          amount: -3000,
        },
        {
          id: 3,
          date: '2022-04-07',
          useItem: { icon: '🎪', value: '문화' },
          usePlace: '탑건',
          targets: ['케빈', '찰스', '프릴', '제임스', '주드', '위드'],
          amount: -4000,
        },
        {
          id: 3,
          date: '2022-04-10',
          useItem: { icon: '🛍', value: '물품' },
          usePlace: '서부족발',
          targets: ['주드', '위드'],
          amount: -4000,
        },
      ],
    };
  },
  computed: {
    date() {
      return (history) => history.date.substring(5).replace('-', '.');
    },
    perAmount() {
      return (history) =>
        getNumFormat(Math.round(history.amount / history.targets.length));
    },
    amount() {
      return (history) => getNumFormat(history.amount);
    },
  },
  methods: {
    handleNumFormat() {},
  },
};
</script>

<style scoped lang="scss">
ul {
  margin-top: 20px;
  font-size: 16px;
  border-top: 5px solid var(--line);
}

li {
  @include flex(space-between);
  padding: 20px;
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
  font-size: 14px;
  font-weight: 600;
}

.target {
  margin-right: 6px;
  padding: 3px;
  background: #e9f6ff;
  color: #2f86c5;
  font-size: 11px;
}

.targetOver {
  color: var(--text-gray);
  font-size: 12px;
  letter-spacing: -0.5px;
}

.amt {
  @include flex(flex-start, flex-end, column);
  font-size: 14px;
  letter-spacing: -0.5px;
}

.perAmount {
  padding-bottom: 3px;
  font-size: 16px;
  font-weight: 800;
}
</style>
