// Tactical MindMate Types

export interface Warrior {
  id: string;
  callsign?: string;
  email?: string;
  isAnonymous: boolean;
  rank: 'RECRUIT' | 'SOLDIER' | 'VETERAN' | 'COMMANDER';
  deployedAt: Date;
  lastSeen: Date;
}

export interface MissionLog {
  id: string;
  warriorId: string;
  missionType: 'RECON' | 'ASSAULT' | 'DEFENSE' | 'RECOVERY' | 'STEALTH';
  status: 1 | 2 | 3 | 4 | 5; // 1 = CRITICAL, 5 = VICTORIOUS
  statusLabel: 'CRITICAL' | 'DAMAGED' | 'OPERATIONAL' | 'STRONG' | 'VICTORIOUS';
  note?: string;
  timestamp: Date;
}

export interface WarLog {
  id: string;
  warriorId: string;
  title: string;
  content: string;
  prompt?: string;
  tags: string[];
  threatLevel?: number;
  classified: boolean;
  timestamp: Date;
  lastModified: Date;
}

export interface BrotherhoodPost {
  id: string;
  warriorId: string;
  callsign: string;
  title: string;
  content: string;
  category: 'combat-stress' | 'brotherhood' | 'tactical' | 'motivation' | 'general' | 'fitness' | 'mental-armor';
  tags: string[];
  support: number;
  supportedBy: string[];
  replies: BrotherhoodReply[];
  stealth: boolean;
  timestamp: Date;
  lastModified: Date;
}

export interface BrotherhoodReply {
  id: string;
  warriorId: string;
  callsign: string;
  content: string;
  support: number;
  supportedBy: string[];
  timestamp: Date;
}

export interface TacticalModule {
  id: string;
  codename: string;
  description: string;
  content: string;
  audioUrl?: string;
  imageUrl?: string;
  category: 'discipline' | 'focus' | 'habits' | 'stress-ops' | 'motivation' | 'mental-armor';
  duration: number; // in minutes
  classified: boolean;
  tags: string[];
  accessed: number;
  endorsed: number;
  deployed: Date;
}

export interface WarriorStats {
  warriorId: string;
  missionStreak: number;
  logsDays: number;
  totalLogs: number;
  totalMissions: number;
  brotherhoodPosts: number;
  supportGiven: number;
  deployedAt: Date;
  lastActive: Date;
}

export type ThreatLevel = {
  bg: string;
  text: string;
  icon: string;
};

export type TacticalMode = 'stealth' | 'assault';

export interface CommPreferences {
  dailyBriefing: boolean;
  missionReminder: boolean;
  brotherhoodUpdates: boolean;
  statusCheck: boolean;
  briefingTime: string; // HH:MM format
}

export interface WarriorProfile {
  warriorId: string;
  preferences: {
    mode: TacticalMode;
    communications: CommPreferences;
    opsec: {
      visibleToBrotherhood: boolean;
      allowDirectComms: boolean;
    };
  };
  objectives: {
    logFrequency: 'daily' | 'weekly' | 'mission-based';
    statusTracking: boolean;
    brotherhoodActive: boolean;
  };
  deployedAt: Date;
  lastUpdate: Date;
}