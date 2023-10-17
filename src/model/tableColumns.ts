import { getArrivalTime } from '../utilits/getArrivalTime'
import { getUnderwayTime } from '../utilits/getUnderwayTime'
import TrainType from '../types/TrainType'

export const tableColumns = () => [
  {
    name: 'train-direction',
    required: true,
    align: 'left',
    label: 'Train direction',
    field: (train: TrainType) => train?.['route-name'],
    filterInputVisible: false,
    headerStyle: 'font-weight: 600; cursor: pointer',
  },
  {
    name: 'train-departure',
    required: true,
    align: 'center',
    label: 'Train departure',
    field: (train: TrainType) => train?.departure,
    sortable: true,
    headerStyle: 'font-weight: 600',
  },
  {
    name: 'underway-time',
    required: true,
    align: 'center',
    label: 'Underway time',
    field: (train: TrainType) => getUnderwayTime(train?.duration),
    sortable: true,
    headerStyle: 'font-weight: 600',
  },
  {
    name: 'arrival-time',
    required: true,
    align: 'center',
    label: 'Arrival time',
    field: (train: TrainType) => getArrivalTime(train?.departure, train?.duration),
    sortable: true,
    headerStyle: 'font-weight: 600',
  },
  {
    name: 'total-seats',
    required: true,
    align: 'center',
    label: 'Total ammount of seats',
    field: (train: TrainType) => train?.['seats-ammount'],
    sortable: true,
    headerStyle: 'font-weight: 600',
  },
  {
    name: 'spare-seats',
    required: true,
    align: 'center',
    label: 'Spare seats',
    field: (train: TrainType) => train?.['free-ammount'].length,
    sortable: true,
    headerStyle: 'font-weight: 600',
  },
]
