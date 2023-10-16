<template>
  <div class="q-pa-md">
    <div class="fixed-center">
      <q-spinner-hourglass color="primary"
size="3em" />
      <div class="text-overline">
Loading
</div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'LoadingSpinner',
}
</script>
<style>
.fixed-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
