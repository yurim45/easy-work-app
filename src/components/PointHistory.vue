<template>
  <ul>
    <li v-for="history in historyList" :key="history.id">
      {{ history.date }}
      <div class="history">
        {{ history.useItem }}
        <div class="historyDetail">
          <p>{{ history.usePlace }}</p>
          <div>
            <span v-for="(target, i) in history.targets" :key="i">{{
              target
            }}</span>
          </div>
        </div>
      </div>
      <div class="amt">
        <div>{{ history.perAmount }}</div>
        <div>{{ history.total }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pointHistory',
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
          total: -3000,
        },
        {
          id: 2,
          date: '2022-04-06',
          useItem: '아이콘',
          usePlace: '서부족발',
          targets: ['프릴', '제임스'],
          perAmount: -1000,
          total: -2000,
        },
        {
          id: 3,
          date: '2022-04-07',
          useItem: '아이콘',
          usePlace: '서부족발',
          targets: ['프릴', '제임스', '주드', '위드'],
          perAmount: -1000,
          total: -4000,
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

.amt {
  display: flex;
  flex-direction: column;
}
</style>
