import { LucideIcon } from 'lucide-react';

export type TrustBadge = 'Bronze' | 'Silver' | 'Gold';

export interface Provider {
  id: string;
  name: string;
  category: string;
  gender: 'Male' | 'Female';
  rating: number;
  reviewsCount: number;
  distance: string;
  badge: TrustBadge;
  image: string;
  description: string;
  isOnline: boolean;
  pricePerHour: number;
  skills: string[];
  location: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type?: 'text' | 'agreement';
  amount?: number;
  status?: 'pending' | 'accepted' | 'declined';
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}