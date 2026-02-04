
export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  tag: string;
  icon: string;
  trigger?: string;
}

export interface AuditResult {
  timestamp: number;
  decisions: Record<string, 'impulse' | 'planned'>;
  totalSpent: number;
  impulseAmount: number;
  plannedAmount: number;
}

export type AppView = 'home' | 'story' | 'audit' | 'summary' | 'report';
