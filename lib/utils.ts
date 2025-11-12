import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return formatDate(date);
}

export function generateAnonymousName(): string {
  const adjectives = [
    'Mindful', 'Brave', 'Strong', 'Wise', 'Calm',
    'Focused', 'Resilient', 'Peaceful', 'Bold', 'Steady',
    'Thoughtful', 'Determined', 'Grounded', 'Balanced', 'Centered'
  ];
  
  const nouns = [
    'Warrior', 'Guardian', 'Explorer', 'Seeker', 'Builder',
    'Dreamer', 'Fighter', 'Thinker', 'Creator', 'Wanderer',
    'Student', 'Brother', 'Friend', 'Mind', 'Soul'
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective} ${noun}`;
}

export function getMoodColor(mood: number) {
  const colors = {
    1: { bg: 'bg-red-500/10', text: 'text-red-500', emoji: '😔' },
    2: { bg: 'bg-orange-500/10', text: 'text-orange-500', emoji: '😕' },
    3: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', emoji: '😐' },
    4: { bg: 'bg-green-500/10', text: 'text-green-500', emoji: '🙂' },
    5: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', emoji: '😊' },
  };
  
  return colors[mood as keyof typeof colors] || colors[3];
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}