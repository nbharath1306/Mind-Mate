'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Send, Lightbulb, Save } from 'lucide-react';
import { JournalEntry } from '@/types';
import toast from 'react-hot-toast';

interface QuickJournalProps {
  expanded?: boolean;
}

export function QuickJournal({ expanded = false }: QuickJournalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const journalPrompts = [
    "What's one thing that went well today?",
    "How did I handle stress today?",
    "What am I grateful for right now?",
    "What emotions am I feeling, and why?",
    "What would I tell a friend going through what I'm experiencing?",
    "What's one small win I can celebrate today?",
    "How can I be kinder to myself tomorrow?",
    "What lesson did I learn today?",
  ];

  const getRandomPrompt = () => {
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setCurrentPrompt(randomPrompt);
    if (!title) setTitle('Daily Reflection');
  };

  const handleSubmitJournal = async () => {
    if (!content.trim()) {
      toast.error('Please write something in your journal');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Save to Firebase
      const journalEntry: Partial<JournalEntry> = {
        title: title.trim() || 'Untitled Entry',
        content: content.trim(),
        prompt: currentPrompt || undefined,
        tags: extractTags(content),
        isPrivate: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log('Saving journal entry:', journalEntry);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Journal entry saved! 📝');
      setTitle('');
      setContent('');
      setCurrentPrompt('');
    } catch (error) {
      toast.error('Failed to save journal entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const extractTags = (text: string): string[] => {
    // Simple tag extraction based on common keywords
    const keywords = ['work', 'stress', 'anxiety', 'happy', 'sad', 'grateful', 'angry', 'tired', 'motivated', 'friendship', 'family', 'health', 'exercise'];
    const foundTags = keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
    return foundTags.slice(0, 5); // Limit to 5 tags
  };

  if (!expanded) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary-500" />
          Quick Journal
        </h3>

        <div className="space-y-3">
          {currentPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3"
            >
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-primary-300">{currentPrompt}</p>
              </div>
            </motion.div>
          )}

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry title..."
            className="input"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind today?"
            className="input resize-none h-24"
          />

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={getRandomPrompt}
              className="btn-ghost flex-1 flex items-center justify-center space-x-2"
            >
              <Lightbulb className="h-4 w-4" />
              <span>Get Prompt</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitJournal}
              disabled={isSubmitting}
              className="btn-primary flex-1 flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : 'Save'}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Expanded view for full journaling page
  return (
    <div className="space-y-6">
      {/* Writing Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <BookOpen className="h-6 w-6 mr-3 text-primary-500" />
          Journal Entry
        </h2>

        <div className="space-y-4">
          {currentPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary-300 mb-1">Writing Prompt</p>
                  <p className="text-primary-200">{currentPrompt}</p>
                </div>
              </div>
            </motion.div>
          )}

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title..."
            className="input text-lg"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, feelings, experiences, or reflections..."
            className="input resize-none h-64 text-base leading-relaxed"
          />

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{content.length} characters</span>
            <span>All entries are private and secure</span>
          </div>

          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={getRandomPrompt}
              className="btn-ghost flex items-center space-x-2"
            >
              <Lightbulb className="h-4 w-4" />
              <span>Get Writing Prompt</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitJournal}
              disabled={isSubmitting}
              className="btn-primary px-8 py-3 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : 'Save Entry'}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Recent Entries */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Entries</h3>
        
        <div className="text-center py-8 text-gray-400">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Your journal entries will appear here</p>
          <p className="text-sm mt-2">Start writing to build your reflection habit</p>
        </div>
      </motion.div>
    </div>
  );
}