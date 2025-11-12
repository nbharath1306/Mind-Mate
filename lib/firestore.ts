import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { MoodEntry, JournalEntry, CommunityPost, UserStats } from '@/types';

// Mood Entry Services
export const moodService = {
  async create(userId: string, moodData: Partial<MoodEntry>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'moodEntries'), {
        ...moodData,
        userId,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating mood entry:', error);
      throw error;
    }
  },

  async getUserMoods(userId: string, limitCount = 30): Promise<MoodEntry[]> {
    try {
      const q = query(
        collection(db, 'moodEntries'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as MoodEntry[];
    } catch (error) {
      console.error('Error fetching mood entries:', error);
      throw error;
    }
  },

  async getMoodStats(userId: string): Promise<{ average: number; streak: number; total: number }> {
    try {
      const moods = await this.getUserMoods(userId, 100);
      
      if (moods.length === 0) {
        return { average: 0, streak: 0, total: 0 };
      }

      const average = moods.reduce((sum, mood) => sum + mood.mood, 0) / moods.length;
      
      // Calculate streak (consecutive days with mood entries)
      let streak = 0;
      const today = new Date();
      const sortedMoods = moods.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      for (let i = 0; i < sortedMoods.length; i++) {
        const moodDate = new Date(sortedMoods[i].createdAt);
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);
        
        // Check if mood was recorded on this day (allowing for different times)
        if (moodDate.toDateString() === expectedDate.toDateString()) {
          streak++;
        } else {
          break;
        }
      }

      return {
        average: Math.round(average * 10) / 10,
        streak,
        total: moods.length,
      };
    } catch (error) {
      console.error('Error calculating mood stats:', error);
      throw error;
    }
  },
};

// Journal Entry Services  
export const journalService = {
  async create(userId: string, journalData: Partial<JournalEntry>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'journalEntries'), {
        ...journalData,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw error;
    }
  },

  async getUserJournals(userId: string, limitCount = 20): Promise<JournalEntry[]> {
    try {
      const q = query(
        collection(db, 'journalEntries'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as JournalEntry[];
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw error;
    }
  },

  async update(entryId: string, updates: Partial<JournalEntry>): Promise<void> {
    try {
      const docRef = doc(db, 'journalEntries', entryId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
  },

  async delete(entryId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'journalEntries', entryId));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  },
};

// Community Post Services
export const communityService = {
  async createPost(userId: string, postData: Partial<CommunityPost>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'communityPosts'), {
        ...postData,
        userId,
        likes: 0,
        likedBy: [],
        replies: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating community post:', error);
      throw error;
    }
  },

  async getPosts(category?: string, limitCount = 20): Promise<CommunityPost[]> {
    try {
      let q = query(
        collection(db, 'communityPosts'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      if (category && category !== 'all') {
        q = query(
          collection(db, 'communityPosts'),
          where('category', '==', category),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as CommunityPost[];
    } catch (error) {
      console.error('Error fetching community posts:', error);
      throw error;
    }
  },

  async likePost(postId: string, userId: string): Promise<void> {
    try {
      const docRef = doc(db, 'communityPosts', postId);
      
      // In a real implementation, you'd want to use a transaction
      // to ensure atomic updates and prevent race conditions
      const postDoc = await getDocs(query(collection(db, 'communityPosts'), where('__name__', '==', postId)));
      const post = postDoc.docs[0].data() as CommunityPost;
      
      const likedBy = post.likedBy || [];
      const hasLiked = likedBy.includes(userId);
      
      if (hasLiked) {
        // Unlike
        await updateDoc(docRef, {
          likes: post.likes - 1,
          likedBy: likedBy.filter(id => id !== userId),
        });
      } else {
        // Like
        await updateDoc(docRef, {
          likes: post.likes + 1,
          likedBy: [...likedBy, userId],
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },
};

// User Stats Services
export const userStatsService = {
  async getUserStats(userId: string): Promise<UserStats | null> {
    try {
      const q = query(
        collection(db, 'userStats'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return {
        ...doc.data(),
        joinedAt: doc.data().joinedAt.toDate(),
        lastActivity: doc.data().lastActivity.toDate(),
      } as UserStats;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  },

  async updateStats(userId: string, updates: Partial<UserStats>): Promise<void> {
    try {
      const q = query(
        collection(db, 'userStats'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Create new stats document
        await addDoc(collection(db, 'userStats'), {
          userId,
          journalStreak: 0,
          moodTrackedDays: 0,
          totalJournalEntries: 0,
          totalMoodEntries: 0,
          communityPosts: 0,
          communityLikes: 0,
          joinedAt: Timestamp.now(),
          lastActivity: Timestamp.now(),
          ...updates,
        });
      } else {
        // Update existing stats
        const docRef = doc(db, 'userStats', querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          ...updates,
          lastActivity: Timestamp.now(),
        });
      }
    } catch (error) {
      console.error('Error updating user stats:', error);
      throw error;
    }
  },
};