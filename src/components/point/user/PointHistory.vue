<template>
  <ul>
    <li v-for="history in historyList" :key="history.id">
      <button
        type="button"
        @click="goToEditPoint(history)"
        :class="{ disabled: isEditDisabled(history) }"
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
import { POINT_HISTORY } from '@/constants';
export default {
  name: 'PointHistory',
  data() {
    return {
      me: {
        name: 'April',
        point: 23000,
      },
      historyList: POINT_HISTORY,
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
    isEditDisabled() {
      return (history) =>
        history.writer !== this.me.name || history.useItem === '보내기';
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
