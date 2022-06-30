<template>
  <ul>
    <li v-for="history in historyList" :key="history.id">
      <span class="date">{{
        history.date.substring(5).replace('-', '.')
      }}</span>
      <div class="history">
        {{ history.useItem }}
        <div class="historyDetail">
          <p>{{ history.usePlace }}</p>
          <div>
            <span
              v-for="(target, i) in history.targets"
              :key="i"
              class="target"
              >{{ target }}</span
            >
          </div>
        </div>
      </div>
      <div class="amt">
        <div>{{ history.perAmount }}</div>
        <div>{{ history.perAmount * history.targets.length }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PointHistory',
  data() {
    return {
      historyList: [
        {
          id: 1,
          date: '2022-04-05',
          useItem: '아이콘',
          usePlace: '서부족발',
          targets: ['프릴', '제임스', '주드'],
          perAmount: -1000,
        },
        {
          id: 2,
          date: '2022-04-06',
          useItem: '아이콘',
          usePlace: '서부족발',
          targets: ['프릴', '제임스'],
          perAmount: -1000,
        },
        {
          id: 3,
          date: '2022-04-07',
          useItem: '아이콘',
          usePlace: '서부족발',
          targets: ['프릴', '제임스', '주드', '위드'],
          perAmount: -1000,
        },
      ],
    };
  },
};
</script>

<style>
ul {
  margin-top: 20px;
  border-top: 5px solid var(--line);
}

li {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.history {
  display: flex;
  width: 60%;
}

.historyDetail {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.date {
  font-size: 14px;
  font-weight: 600;
}

.target {
  margin: 0 3px;
  padding: 3px;
  background: #e9f6ff;
  color: #2f86c5;
  font-size: 11px;
  white-space: nowrap;
}

.amt {
  display: flex;
  flex-direction: column;
}
</style>
