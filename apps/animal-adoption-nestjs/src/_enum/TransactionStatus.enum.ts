export enum TransactionStatus {
  REQUEST_RECIEVED = 'recieved',
  ON_REVIEW = 'review',
  WAITING_FOR_PAYMENT = 'wfp',
  WAITING_FOR_CONFIRMATION = 'wfc',
  ON_DELIVERY = 'delivery',
  REQUEST_CANCELLED = 'cancelled',
  REQUEST_FINISHED = 'finished',
}
