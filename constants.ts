
import { Transaction } from './types';

export const COLORS = {
  bg: '#F2F4F8',
  impulse: '#FF8A80', // Soft Coral
  planned: '#80CBC4', // Calm Teal
  primary: '#3949AB', // Deep Indigo
  gpayBlue: '#1a73e8', // Standard GPay Blue
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

export const MOCK_PEOPLE = [
  { id: 1, name: 'Rahul', img: 'https://i.pravatar.cc/150?u=rahul' },
  { id: 2, name: 'Mom', img: 'https://i.pravatar.cc/150?u=mom' },
  { id: 3, name: 'Landlord', img: 'https://i.pravatar.cc/150?u=house' },
  { id: 4, name: 'Swiggy', img: 'https://i.pravatar.cc/150?u=delivery' },
];

export const MOCK_BUSINESSES = [
  { id: 1, name: 'Jio', icon: '📶', color: 'bg-blue-100' },
  { id: 2, name: 'Bescom', icon: '⚡', color: 'bg-yellow-100' },
  { id: 3, name: 'Zomato', icon: '🍴', color: 'bg-red-100' },
  { id: 4, name: 'Metro', icon: '🚆', color: 'bg-purple-100' },
];
