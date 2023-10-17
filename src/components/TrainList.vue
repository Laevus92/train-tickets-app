<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      title="Train tickets"
      :rows="trainList"
      :columns="columns"
      :rowKey="(train) => train.id"
      :filter="filter"
      :filterMethod="filterByFirstColumn"
      separator="vertical"
      @rowClick="showDetailedInfo"
    >
      <template #header-cell-train-direction="props">
        <q-th :props="props">
          {{ props.col.label }}
          <q-icon name="search" size="1.5em" />
          <q-popup-proxy ref="popupProxy">
            <div class="dialog-window">
              <q-input
                v-model="filter"
                label="Search station"
                stackLabel
                :dense="true"
                class="filter-field"
              />
              <button class="clear-button" @click="clearFilter">Clear</button>
            </div>
          </q-popup-proxy>
        </q-th>
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from 'axios'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { tableColumns } from '../model/tableColumns'
import { useTrainsStore } from '../stores/trainsStore'

export default {
  name: 'TrainList',

  props: {
    trainList: {
      required: true,
      defaultValue: [],
      type: Array,
    },
  },

  setup() {
    const columns = tableColumns()

    const trainStore = useTrainsStore()

    const $q = useQuasar()

    function showDetailedInfo(event, row) {
      const checkboxes = []

      for (let i = 0; i < row?.['seats-ammount']; i += 1) {
        checkboxes.push({
          label: `Seat #${i + 1}`,
          value: i + 1,
          disable: !row?.['free-ammount'].includes(i + 1),
        })
      }

      $q.dialog({
        title: `${row?.['route-name']}`,

        message: `Book your tikets to train ${row?.['route-name']}`,

        ok: {
          label: 'Buy now!',
        },

        options: {
          type: 'checkbox',
          model: [],
          isValid: (model) => model.length > 0,
          items: checkboxes,
        },
      }).onOk(async (data) => {
        let actualTicketsInfo
        try {
          actualTicketsInfo = await axios.get(`http://localhost:3000/trains/${row?.id}`)
          trainStore.getTrains()
        } catch (error) {
          $q.notify({
            type: 'warning',
            message: 'Oops! Something went wrong!',
          })
        }

        if (data.every((el) => actualTicketsInfo.data?.['free-ammount'].includes(el))) {
          try {
            const body = {
              'free-ammount': row['free-ammount'].filter((el) => !data.includes(el)),
            }
            trainStore.updateTrains(row?.id, body)
          } catch (error) {
            $q.notify({
              type: 'warning',
              message: 'Oops! Something went wrong!',
            })
          }
        } else {
          $q.notify({
            type: 'negative',
            message: 'someone have already bought this tikets, choose another tickets',
          })
        }
      })
    }

    return {
      filter: ref(''),
      columns,
      showDetailedInfo,
    }
  },

  methods: {
    clearFilter() {
      this.filter = ''
      this.$refs.popupProxy.hide()
    },

    filterByFirstColumn(rows, terms) {
      return rows.filter((row) => row['route-name'].toLowerCase().includes(terms.toLowerCase()))
    },
  },
}
</script>

<style>
.dialog-window {
  display: flex;
  align-items: center;
}
.dialog-window > * {
  display: block;
}
.filter-field {
  width: 100%;
  padding: 5px 10px;
}
.clear-button {
  padding: 5px 10px;
  margin: 0px 10px;
  background: none;
  cursor: pointer;
  border: 2px solid #1976d2;
  color: #1976d2;
}
</style>
