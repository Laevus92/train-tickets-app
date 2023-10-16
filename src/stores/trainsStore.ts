import axios from 'axios'
import { defineStore } from 'pinia'
import { Notify } from 'quasar'

export const useTrainsStore = defineStore('trainStore', {
  state: () => ({
    trains: [],
    isLoading: true,
    updateCount: 0,
  }),
  actions: {
    async getTrains() {
      try {
        const response = await axios.get('http://localhost:3000/trains')
        this.trains = response.data
      } catch (error) {
        Notify.create({
          type: 'warning',
          message: 'Something went wrong',
        })
      } finally {
        this.isLoading = false
      }
    },

    async updateTrains(id, body) {
      try {
        this.isLoading = true
        await axios.patch(`http://localhost:3000/trains/${id}`, body)
        this.updateCount += 1
        this.isLoading = false
        Notify.create({
          type: 'positive',
          message: 'Tickets was bought successfully',
        })
      } catch (error) {
        Notify.create({
          type: 'warning',
          message: 'Something went wrong',
        })
      }
    },
  },
})
