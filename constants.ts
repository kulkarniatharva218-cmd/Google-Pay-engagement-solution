
import { Transaction } from './types';

export const COLORS = {
  bg: '#F2F4F8',
  impulse: '#FF8A80', // Soft Coral
  planned: '#80CBC4', // Calm Teal
  primary: '#3949AB', // Deep Indigo
  textDark: '#1C1B1F',
  textSecondary: '#49454F'
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    merchant: 'Swiggy Instamart',
    amount: 450,
    tag: 'Late Night Cravings',
    icon: '🌙',
    trigger: 'Boredom?'
  },
  {
    id: '2',
    merchant: 'Starbucks',
    amount: 320,
    tag: 'Work Meeting',
    icon: '☕',
    trigger: 'Networking'
  },
  {
    id: '3',
    merchant: 'Amazon',
    amount: 1250,
    tag: 'Doom Scrolling',
    icon: '📦',
    trigger: 'Stress'
  },
  {
    id: '4',
    merchant: 'Zomato',
    amount: 680,
    tag: 'Friday Treat',
    icon: '🍕',
    trigger: 'Reward'
  }
];
