import { TransactionStatus } from '@/_enum';

export const transactionStatusFlow: {
  phase: string;
  description?: string;
  status: TransactionStatus[];
}[] = [
  {
    phase: 'request',
    description: 'Request for adoption',
    status: [TransactionStatus.REQUEST_RECIEVED],
  },
  {
    phase: 'review',
    description: 'Review adoption request',
    status: [TransactionStatus.ON_REVIEW, TransactionStatus.REQUEST_CANCELLED],
  },
  {
    phase: 'negotiation',
    description: 'Request negotiation',
    status: [
      TransactionStatus.REQUEST_CANCELLED,
      TransactionStatus.WAITING_FOR_CONFIRMATION,
      TransactionStatus.WAITING_FOR_PAYMENT,
    ],
  },
  {
    phase: 'transfer',
    description: 'Transfer ownership and delivery',
    status: [TransactionStatus.ON_DELIVERY],
  },
  {
    phase: 'finish',
    description: 'Finish transaction',
    status: [TransactionStatus.REQUEST_FINISHED],
  },
];
