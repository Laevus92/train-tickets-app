<template>
  <train-list v-show="!trainStore.isLoading" :train-list="trainStore.trains" />
  <loading-spinner v-show="trainStore.isLoading" />
</template>

<script>
import { watch } from 'vue'
import { useTrainsStore } from './stores/trainsStore'
import LoadingSpinner from './components/LoadingSpinner.vue'
import TrainList from './components/TrainList.vue'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  components: {
    TrainList,
    LoadingSpinner,
  },
  setup() {
    const trainStore = useTrainsStore()

    trainStore.getTrains()

    watch(() => trainStore.updateCount, () => {
      trainStore.getTrains()
    })

    return { trainStore }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>