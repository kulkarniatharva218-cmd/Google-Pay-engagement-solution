
export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  tag: string;
  icon: string;
  trigger?: string;
}

export type AppView = 'home' | 'story' | 'audit' | 'summary';
