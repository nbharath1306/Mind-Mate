'use client';

import React, { useState, useEffect } from 'react';

interface Quote {
  id: string;
  text: string;
  author: string;
  category: 'STRENGTH' | 'DISCIPLINE' | 'MENTAL' | 'SUCCESS' | 'WARRIOR';
  isFavorited?: boolean;
}

interface Fact {
  id: string;
  title: string;
  content: string;
  category: 'PSYCHOLOGY' | 'SUCCESS' | 'HEALTH' | 'LEADERSHIP';
  source: string;
}

interface Affirmation {
  id: string;
  text: string;
  category: 'CONFIDENCE' | 'STRENGTH' | 'FOCUS' | 'GROWTH';
}

export function DailyStrength() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'today' | 'browse' | 'favorites'>('today');

  const tacticalQuotes: Quote[] = [
    {
      id: 'q1',
      text: 'The warrior and the artist live by the same code of necessity, which dictates that the battle must be fought anew every day.',
      author: 'Steven Pressfield',
      category: 'WARRIOR'
    },
    {
      id: 'q2',
      text: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
      author: 'Marcus Aurelius',
      category: 'MENTAL'
    },
    {
      id: 'q3',
      text: 'The successful warrior is the average man with laser-like focus.',
      author: 'Bruce Lee',
      category: 'DISCIPLINE'
    },
    {
      id: 'q4',
      text: 'It is during our darkest moments that we must focus to see the light.',
      author: 'Aristotle',
      category: 'STRENGTH'
    },
    {
      id: 'q5',
      text: 'The cave you fear to enter holds the treasure you seek.',
      author: 'Joseph Campbell',
      category: 'STRENGTH'
    },
    {
      id: 'q6',
      text: 'A ship in harbor is safe, but that is not what ships are built for.',
      author: 'John A. Shedd',
      category: 'SUCCESS'
    },
    {
      id: 'q7',
      text: 'The only impossible journey is the one you never begin.',
      author: 'Tony Robbins',
      category: 'SUCCESS'
    },
    {
      id: 'q8',
      text: 'Strength does not come from physical capacity. It comes from an indomitable will.',
      author: 'Mahatma Gandhi',
      category: 'STRENGTH'
    },
    {
      id: 'q9',
      text: 'The man who moves a mountain begins by carrying away small stones.',
      author: 'Confucius',
      category: 'DISCIPLINE'
    },
    {
      id: 'q10',
      text: 'In the middle of difficulty lies opportunity.',
      author: 'Albert Einstein',
      category: 'MENTAL'
    }
  ];

  const mentalFacts: Fact[] = [
    {
      id: 'f1',
      title: 'The 2-Minute Rule',
      content: 'Research shows that if you can\'t do something for at least 2 minutes, you can\'t do it for 2 hours. Start small to build momentum.',
      category: 'PSYCHOLOGY',
      source: 'James Clear, Atomic Habits'
    },
    {
      id: 'f2',
      title: 'Mental Toughness Peak',
      content: 'Studies indicate that men\'s mental resilience peaks between ages 25-35, making this the optimal time for building discipline systems.',
      category: 'PSYCHOLOGY',
      source: 'Journal of Applied Psychology'
    },
    {
      id: 'f3',
      title: 'Success Mindset',
      content: '92% of successful entrepreneurs report having a daily routine that includes reflection and goal setting.',
      category: 'SUCCESS',
      source: 'Harvard Business Review'
    },
    {
      id: 'f4',
      title: 'Physical-Mental Link',
      content: 'Just 20 minutes of exercise can boost cognitive function and decision-making ability for up to 12 hours.',
      category: 'HEALTH',
      source: 'American College of Sports Medicine'
    },
    {
      id: 'f5',
      title: 'Leadership Development',
      content: 'Research shows that 80% of leadership skills are developed through challenging experiences, not formal training.',
      category: 'LEADERSHIP',
      source: 'Center for Creative Leadership'
    },
    {
      id: 'f6',
      title: 'Stress Response',
      content: 'Men who practice daily mindfulness show 23% better stress management and 31% improved focus in high-pressure situations.',
      category: 'PSYCHOLOGY',
      source: 'Mindfulness Research Journal'
    }
  ];

  const warriorAffirmations: Affirmation[] = [
    {
      id: 'a1',
      text: 'I am the architect of my own destiny and the commander of my mental battlefield.',
      category: 'STRENGTH'
    },
    {
      id: 'a2',
      text: 'Every challenge I face is an opportunity to prove my warrior spirit.',
      category: 'CONFIDENCE'
    },
    {
      id: 'a3',
      text: 'My focus is laser-sharp, cutting through distractions like a tactical blade.',
      category: 'FOCUS'
    },
    {
      id: 'a4',
      text: 'I embrace discomfort as the forge that strengthens my character.',
      category: 'GROWTH'
    },
    {
      id: 'a5',
      text: 'My discipline is my weapon, and consistency is my armor.',
      category: 'STRENGTH'
    },
    {
      id: 'a6',
      text: 'I choose courage over comfort in every decision I make.',
      category: 'CONFIDENCE'
    },
    {
      id: 'a7',
      text: 'My mind is clear, my purpose is defined, and my action is inevitable.',
      category: 'FOCUS'
    },
    {
      id: 'a8',
      text: 'Every setback is intelligence for my next strategic advance.',
      category: 'GROWTH'
    }
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('daily-strength-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('daily-strength-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Get daily content based on date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    
    setCurrentQuote(tacticalQuotes[dayOfYear % tacticalQuotes.length]);
    setCurrentFact(mentalFacts[dayOfYear % mentalFacts.length]);
    setCurrentAffirmation(warriorAffirmations[dayOfYear % warriorAffirmations.length]);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const getRandomContent = () => {
    setCurrentQuote(tacticalQuotes[Math.floor(Math.random() * tacticalQuotes.length)]);
    setCurrentFact(mentalFacts[Math.floor(Math.random() * mentalFacts.length)]);
    setCurrentAffirmation(warriorAffirmations[Math.floor(Math.random() * warriorAffirmations.length)]);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'WARRIOR':
      case 'STRENGTH': return 'border-red-500 text-red-400';
      case 'MENTAL':
      case 'PSYCHOLOGY': return 'border-blue-500 text-blue-400';
      case 'DISCIPLINE':
      case 'FOCUS': return 'border-yellow-500 text-yellow-400';
      case 'SUCCESS':
      case 'GROWTH': return 'border-green-500 text-green-400';
      case 'CONFIDENCE': return 'border-purple-500 text-purple-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  const favoriteQuotes = tacticalQuotes.filter(q => favorites.includes(q.id));
  const favoriteFacts = mentalFacts.filter(f => favorites.includes(f.id));
  const favoriteAffirmations = warriorAffirmations.filter(a => favorites.includes(a.id));

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-2 border-red-600/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-500 mb-2">[ DAILY STRENGTH MODULE ]</h1>
            <div className="text-gray-400">Mental Fortification • {new Date().toLocaleDateString()}</div>
          </div>
          <div className="flex space-x-2">
            {['today', 'browse', 'favorites'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-4 py-2 rounded-none border transition-all font-mono ${
                  viewMode === mode 
                    ? 'bg-red-600 border-red-500 text-white' 
                    : 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400'
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Today View */}
      {viewMode === 'today' && currentQuote && currentFact && currentAffirmation && (
        <div className="p-6 space-y-8">
          <div className="text-center mb-8">
            <button
              onClick={getRandomContent}
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-3 rounded-none border border-yellow-500 transition-all font-mono"
            >
              🎯 RANDOMIZE TACTICAL INTEL
            </button>
          </div>

          {/* Daily Quote */}
          <div className="bg-gray-900 border-2 border-red-600/30 rounded-none p-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-red-500">[ WARRIOR WISDOM ]</h2>
              <button
                onClick={() => toggleFavorite(currentQuote.id)}
                className={`transition-colors ${favorites.includes(currentQuote.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-400'}`}
              >
                ❤️
              </button>
            </div>
            <blockquote className="text-lg text-gray-100 mb-4 leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <div className="flex items-center justify-between">
              <cite className="text-gray-400">— {currentQuote.author}</cite>
              <span className={`text-xs px-2 py-1 border rounded-none ${getCategoryColor(currentQuote.category)}`}>
                {currentQuote.category}
              </span>
            </div>
          </div>

          {/* Daily Fact */}
          <div className="bg-gray-900 border-2 border-blue-600/30 rounded-none p-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-500">[ TACTICAL INTELLIGENCE ]</h2>
              <button
                onClick={() => toggleFavorite(currentFact.id)}
                className={`transition-colors ${favorites.includes(currentFact.id) ? 'text-blue-500' : 'text-gray-500 hover:text-blue-400'}`}
              >
                ⭐
              </button>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{currentFact.title}</h3>
            <p className="text-gray-100 mb-4 leading-relaxed">{currentFact.content}</p>
            <div className="flex items-center justify-between">
              <cite className="text-gray-400 text-sm">Source: {currentFact.source}</cite>
              <span className={`text-xs px-2 py-1 border rounded-none ${getCategoryColor(currentFact.category)}`}>
                {currentFact.category}
              </span>
            </div>
          </div>

          {/* Daily Affirmation */}
          <div className="bg-gray-900 border-2 border-green-600/30 rounded-none p-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-green-500">[ WARRIOR AFFIRMATION ]</h2>
              <button
                onClick={() => toggleFavorite(currentAffirmation.id)}
                className={`transition-colors ${favorites.includes(currentAffirmation.id) ? 'text-green-500' : 'text-gray-500 hover:text-green-400'}`}
              >
                💪
              </button>
            </div>
            <p className="text-lg text-gray-100 mb-4 leading-relaxed font-semibold">
              {currentAffirmation.text}
            </p>
            <span className={`text-xs px-2 py-1 border rounded-none ${getCategoryColor(currentAffirmation.category)}`}>
              {currentAffirmation.category}
            </span>
          </div>
        </div>
      )}

      {/* Browse View */}
      {viewMode === 'browse' && (
        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* All Quotes */}
            <div>
              <h3 className="text-lg font-bold text-red-500 mb-4">[ ALL WARRIOR WISDOM ]</h3>
              <div className="space-y-4">
                {tacticalQuotes.map(quote => (
                  <div key={quote.id} className="bg-gray-900 border border-gray-600 p-4 rounded-none">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 border rounded-none ${getCategoryColor(quote.category)}`}>
                        {quote.category}
                      </span>
                      <button
                        onClick={() => toggleFavorite(quote.id)}
                        className={`transition-colors ${favorites.includes(quote.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-400'}`}
                      >
                        ❤️
                      </button>
                    </div>
                    <p className="text-sm text-gray-100 mb-2">"{quote.text}"</p>
                    <p className="text-xs text-gray-400">— {quote.author}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* All Facts */}
            <div>
              <h3 className="text-lg font-bold text-blue-500 mb-4">[ ALL TACTICAL INTEL ]</h3>
              <div className="space-y-4">
                {mentalFacts.map(fact => (
                  <div key={fact.id} className="bg-gray-900 border border-gray-600 p-4 rounded-none">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 border rounded-none ${getCategoryColor(fact.category)}`}>
                        {fact.category}
                      </span>
                      <button
                        onClick={() => toggleFavorite(fact.id)}
                        className={`transition-colors ${favorites.includes(fact.id) ? 'text-blue-500' : 'text-gray-500 hover:text-blue-400'}`}
                      >
                        ⭐
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">{fact.title}</h4>
                    <p className="text-xs text-gray-100 mb-2">{fact.content}</p>
                    <p className="text-xs text-gray-400">{fact.source}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* All Affirmations */}
            <div>
              <h3 className="text-lg font-bold text-green-500 mb-4">[ ALL AFFIRMATIONS ]</h3>
              <div className="space-y-4">
                {warriorAffirmations.map(affirmation => (
                  <div key={affirmation.id} className="bg-gray-900 border border-gray-600 p-4 rounded-none">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 border rounded-none ${getCategoryColor(affirmation.category)}`}>
                        {affirmation.category}
                      </span>
                      <button
                        onClick={() => toggleFavorite(affirmation.id)}
                        className={`transition-colors ${favorites.includes(affirmation.id) ? 'text-green-500' : 'text-gray-500 hover:text-green-400'}`}
                      >
                        💪
                      </button>
                    </div>
                    <p className="text-sm text-gray-100">{affirmation.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Favorites View */}
      {viewMode === 'favorites' && (
        <div className="p-6">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">⭐</div>
              <div className="text-xl mb-2">No favorites yet</div>
              <div>Start favoriting content to build your personal arsenal</div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {favoriteQuotes.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-red-500 mb-4">[ FAVORITE WISDOM ]</h3>
                  <div className="space-y-4">
                    {favoriteQuotes.map(quote => (
                      <div key={quote.id} className="bg-gray-900 border border-red-600/30 p-4 rounded-none">
                        <p className="text-sm text-gray-100 mb-2">"{quote.text}"</p>
                        <p className="text-xs text-gray-400">— {quote.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {favoriteFacts.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-blue-500 mb-4">[ FAVORITE INTEL ]</h3>
                  <div className="space-y-4">
                    {favoriteFacts.map(fact => (
                      <div key={fact.id} className="bg-gray-900 border border-blue-600/30 p-4 rounded-none">
                        <h4 className="text-sm font-bold text-white mb-2">{fact.title}</h4>
                        <p className="text-xs text-gray-100">{fact.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {favoriteAffirmations.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-green-500 mb-4">[ FAVORITE AFFIRMATIONS ]</h3>
                  <div className="space-y-4">
                    {favoriteAffirmations.map(affirmation => (
                      <div key={affirmation.id} className="bg-gray-900 border border-green-600/30 p-4 rounded-none">
                        <p className="text-sm text-gray-100">{affirmation.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}