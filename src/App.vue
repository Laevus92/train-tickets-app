<template>
  <div>
    <TrainList v-show="!trainStore.isLoading" :trainList="trainStore.trains" />
    <LoadingSpinner v-show="trainStore.isLoading" />
  </div>
</template>

<script>
import { watch } from 'vue'
import TrainList from './components/TrainList.vue'
import { useTrainsStore } from './stores/trainsStore'
import LoadingSpinner from './components/LoadingSpinner.vue'

export default {
  components: {
    TrainList,
    LoadingSpinner,
  },

  setup() {
    const trainStore = useTrainsStore()

    trainStore.getTrains()

    watch(
      () => trainStore.updateCount,
      () => {
        trainStore.getTrains()
      },
    )

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
