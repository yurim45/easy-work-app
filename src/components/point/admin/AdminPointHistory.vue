<template>
  <accordion-view title="포인트 사용내역">
    <section>
      <div class="period">
        <div class="periodLabel">
          <span>📅 조회 기간</span>
          <button-view label="조회" @onClick="onSubmit" />
        </div>
        <div class="periodDate">
          <date-view
            name="startDate"
            :inputValue="startDate"
            @handleValue="handleValue($event)"
          />
          <span>~</span>
          <date-view
            name="endDate"
            :inputValue="endDate"
            @handleValue="handleValue($event)"
          />
        </div>
      </div>
      <ul>
        <li class="labels">
          <span class="dateLabel">날짜</span>
          <span class="labelLayout">
            <span class="items">구분</span>
            <span class="items">사용처</span>
          </span>
          <span class="labelLayout">
            <span class="users">참여자</span>
            <span class="users">제외자</span>
          </span>
          <span class="labelLayout">
            <span class="point">사용</span>
            <span class="point">인당차감</span>
          </span>
          <span class="label point">차감사용</span>
        </li>
        <li class="value" v-for="item in history" :key="item.id">
          <span class="dateLabel">{{ date(item) }}</span>
          <span class="labelLayout">
            <span class="items">{{ item.useItem }}</span>
            <span class="items">{{ item.usePlace }}</span>
          </span>
          <span class="labelLayout">
            <div class="users">
              <template v-for="(user, i) in item.targets" :key="i">
                <span v-if="i < 3" class="user">
                  {{ userIcon(user) }}
                </span>
              </template>
              <span v-if="item.targets.length > 3" class="targetOver">
                (외 {{ otherTargets(item) }}명)
              </span>
            </div>
            <div class="users">
              <span
                class="user"
                v-for="(user, i) in item.excludedTargets"
                :key="i"
                >{{ userIcon(user) }}
              </span>
            </div>
          </span>
          <span class="labelLayout">
            <span class="point">{{ amount(item) }} P</span>
            <span class="point">{{ perAmount(item) }} P</span>
          </span>
          <span class="point">{{ usePoint(item) }} P</span>
        </li>
      </ul>
    </section>
  </accordion-view>
</template>

<script>
import AccordionView from '@/components/common/AccordionView.vue';
import { DateView, ButtonView } from '@/components/common/index';
import { ADMIN_POINT_HISTORY } from '@/constants';
import { getNumFormat } from '@/util';

export default {
  name: 'AdminPointHistory',
  components: { AccordionView, DateView, ButtonView },
  data() {
    return {
      startDate: `${new Date().toISOString().substr(0, 8)}01`,
      endDate: new Date().toISOString().substr(0, 10),
      history: [],
    };
  },
  mounted() {
    this.history = ADMIN_POINT_HISTORY;
  },
  computed: {
    date() {
      return (item) => item.date.substring(5).replace('-', '.');
    },
    userIcon() {
      return (user) => user.substring(0, 1);
    },
    otherTargets() {
      return (item) => item.targets.length + item.excludedTargets.length - 3;
    },
    amount() {
      return (item) => getNumFormat(item.amount);
    },
    perAmount() {
      return (item) =>
        getNumFormat(
          item.amount / (item.targets.length + item.excludedTargets.length)
        );
    },
    usePoint() {
      return (item) =>
        getNumFormat(
          (item.amount / (item.targets.length + item.excludedTargets.length)) *
            item.targets.length
        );
    },
  },
  methods: {
    handleValue(value) {
      switch (value.name) {
        case 'startDate':
          this.startDate = value.value;
          return;
        case 'endDate':
          this.endDate = value.value;
          return;
      }
    },
    onSubmit() {
      console.log(this.startDate, this.endDate);
    },
  },
};
</script>

<style scoped lang="scss">
section {
  margin-bottom: 50px;
}

.period {
  margin: 10px 0;
  padding: 0 20px;
}

.periodLabel {
  @include flex(space-between);
  padding: 10px 10px 0;
  font-weight: 600;

  .button {
    width: 50px;
    height: 25px;
    font-size: 14px;
  }
}

.periodDate {
  @include flex(space-between);

  span {
    margin: 0 10px 10px;
  }
}

.labels,
.value {
  @include flex(space-between);
  padding: 10px;
  font-size: 14px;
}

.labels {
  font-weight: 600;
  border-bottom: 5px solid var(--line);
}

.items,
.users {
  @include flex(cetner, start);
}

.dateLabel {
  width: 45px;
  font-size: 13px;
}

.items {
  width: 80px;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.users {
  width: 110px;
}

.user {
  display: inilne-block;
  margin-right: 2px;
  width: 20px;
  height: 20px;
  @include stIcon;
  text-align: center;
  border-radius: 50%;
}

.targetOver {
  color: var(--text-gray);
  font-size: 12px;
  letter-spacing: -0.8px;
}

.point {
  width: 70px;
  font-size: 13px;
}

.value {
  .point {
    text-align: right;
  }
}

.labelLayout {
  @include flex(center, cetner, column);
}
</style>
