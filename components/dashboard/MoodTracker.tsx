'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Meh, Frown, MessageCircle, Calendar } from 'lucide-react';
import { MoodEntry } from '@/types';
import toast from 'react-hot-toast';

interface MoodTrackerProps {
  expanded?: boolean;
}

export function MoodTracker({ expanded = false }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { value: 1, label: 'Very Low', emoji: '😔', color: 'text-red-500', bg: 'bg-red-500/10' },
    { value: 2, label: 'Low', emoji: '😕', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { value: 3, label: 'Okay', emoji: '😐', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { value: 4, label: 'Good', emoji: '🙂', color: 'text-green-500', bg: 'bg-green-500/10' },
    { value: 5, label: 'Great', emoji: '😊', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  const handleSubmitMood = async () => {
    if (!selectedMood) {
      toast.error('Please select a mood first');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Save to Firebase
      const moodEntry: Partial<MoodEntry> = {
        mood: selectedMood as 1 | 2 | 3 | 4 | 5,
        moodLabel: moods.find(m => m.value === selectedMood)?.label as any,
        note: note.trim() || undefined,
        createdAt: new Date(),
      };

      console.log('Saving mood entry:', moodEntry);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Mood tracked! 🎯');
      setSelectedMood(null);
      setNote('');
    } catch (error) {
      toast.error('Failed to save mood. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!expanded) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-primary-500" />
          How are you feeling?
        </h3>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-3 rounded-lg border transition-all ${
                selectedMood === mood.value
                  ? `border-primary-500 ${mood.bg}`
                  : 'border-navy-600 hover:border-navy-500'
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className="text-xs text-gray-400">{mood.label}</div>
            </motion.button>
          ))}
        </div>

        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any thoughts about your mood? (optional)"
              className="input resize-none h-20"
            />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitMood}
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? 'Saving...' : 'Track Mood'}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Expanded view for full mood tracking page
  return (
    <div className="space-y-6">
      {/* Current Mood Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Heart className="h-6 w-6 mr-3 text-primary-500" />
          How are you feeling today?
        </h2>

        <div className="grid grid-cols-5 gap-4 mb-6">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedMood === mood.value
                  ? `border-primary-500 ${mood.bg}`
                  : 'border-navy-600 hover:border-navy-500'
              }`}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium text-white">{mood.label}</div>
            </motion.button>
          ))}
        </div>

        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                What's on your mind? (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Share what's contributing to this mood, any thoughts, or what happened today..."
                className="input resize-none h-32"
                maxLength={500}
              />
              <div className="text-xs text-gray-400 mt-1">
                {note.length}/500 characters
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitMood}
              disabled={isSubmitting}
              className="btn-primary px-8 py-3 text-lg"
            >
              {isSubmitting ? 'Saving...' : 'Track This Mood'}
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Mood History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary-500" />
          Your Mood Journey
        </h3>

        <div className="text-center py-8 text-gray-400">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Start tracking your mood to see patterns and insights here</p>
        </div>
      </motion.div>
    </div>
  );
}