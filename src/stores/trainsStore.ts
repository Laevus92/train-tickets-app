import axios from 'axios'
import { defineStore } from 'pinia'

export const useTrainsStore = defineStore('trainStore', {
  state: () => ({
    trains: [],
    isLoading: true,
    updateCount: 0,
  }),
  actions: {
    async getTrains() {
      try {
        const response = await axios.get("http://localhost:3000/trains")
        this.trains = response.data
      } catch (error) {
        console.error(error)
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
      } catch (error) {
        console.error(error)
      }
    },
  }
})
