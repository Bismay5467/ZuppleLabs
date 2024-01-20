type TStatus = "success" | "pending" | "failed";

export interface ITransactionHistory {
  hash?: string;
  message?: string;
  amount: number;
  status: TStatus;
}

export interface ITransactionProcessing {
  status: TStatus;
  heading?: string;
  message?: string;
  hash?: string;
  amount?: number;
  fee?: string;
}

export interface ITransaction {
  hash: string;
  timestamp: number;
  processing: ITransactionProcessing;
  history: ITransactionHistory[];
}

export interface IBlock {
  id?: number;
  fees: number;
  feesRange: string;
  size: number;
  noOfTransactions: number;
  addedToNetwork: boolean;
  timestamp: number;
  hash?: string;
  weight: number;
  "total fees": number;
  "subsidy + fees": number;
  miner: string;
  noOfPages: number;
}

export type TModalHeader = Omit<
  IBlock,
  "fees" | "feesRange" | "addedToNetwork"
>;

export type TBlockDetail = Pick<
  IBlock,
  | "size"
  | "weight"
  | "total fees"
  | "subsidy + fees"
  | "hash"
  | "timestamp"
  | "miner"
>;

export type TBlockInfo = Pick<
  IBlock,
  | "id"
  | "fees"
  | "addedToNetwork"
  | "feesRange"
  | "noOfTransactions"
  | "size"
  | "timestamp"
>;
