'use client';

import React, { useState, useEffect } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  category: 'MASCULINITY' | 'LEADERSHIP' | 'MENTAL_TOUGHNESS' | 'PHILOSOPHY' | 'SELF_IMPROVEMENT' | 'BIOGRAPHY';
  description: string;
  keyLessons: string[];
  difficulty: 'RECRUIT' | 'SOLDIER' | 'VETERAN' | 'ELITE';
  readingTime: string;
  rating: number;
  amazonUrl?: string;
  isRead?: boolean;
  dateAdded?: Date;
  personalNotes?: string;
}

interface ReadingGoal {
  booksPerMonth: number;
  currentMonth: number;
  targetCategories: string[];
}

export function KnowledgeArsenal() {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<string[]>([]);
  const [readBooks, setReadBooks] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'catalog' | 'reading' | 'completed'>('catalog');
  const [readingGoal, setReadingGoal] = useState<ReadingGoal>({ booksPerMonth: 2, currentMonth: 0, targetCategories: [] });

  const tacticalBooks: Book[] = [
    {
      id: 'book-1',
      title: 'The Way of Men',
      author: 'Jack Donovan',
      category: 'MASCULINITY',
      description: 'A primal examination of what it means to be a man in the modern world. Explores the four tactical virtues of masculinity.',
      keyLessons: [
        'The four tactical virtues: Strength, Courage, Mastery, Honor',
        'Understanding the gang vs. group dynamic',
        'Why modern men feel disconnected from their masculine nature'
      ],
      difficulty: 'SOLDIER',
      readingTime: '4-5 hours',
      rating: 4.3,
      amazonUrl: '#'
    },
    {
      id: 'book-2',
      title: 'Can\'t Hurt Me',
      author: 'David Goggins',
      category: 'MENTAL_TOUGHNESS',
      description: 'Master your mind and defy the odds. A Navy SEAL\'s guide to mental toughness and overcoming limitations.',
      keyLessons: [
        'The 40% rule - most people quit when they\'re only 40% done',
        'Callusing your mind through deliberate suffering',
        'The accountability mirror technique'
      ],
      difficulty: 'VETERAN',
      readingTime: '8-10 hours',
      rating: 4.8,
      amazonUrl: '#'
    },
    {
      id: 'book-3',
      title: 'Extreme Ownership',
      author: 'Jocko Willink',
      category: 'LEADERSHIP',
      description: 'Leadership lessons from the most decorated special operations unit. Take ownership, lead from the front.',
      keyLessons: [
        'Extreme ownership of all outcomes',
        'No bad teams, only bad leaders',
        'Simple, clear, and concise communication'
      ],
      difficulty: 'ELITE',
      readingTime: '6-7 hours',
      rating: 4.7,
      amazonUrl: '#'
    },
    {
      id: 'book-4',
      title: 'Meditations',
      author: 'Marcus Aurelius',
      category: 'PHILOSOPHY',
      description: 'Stoic philosophy from a Roman Emperor. Personal reflections on duty, mortality, and virtue.',
      keyLessons: [
        'Focus only on what you can control',
        'Memento mori - remember you will die',
        'The discipline of desire, action, and assent'
      ],
      difficulty: 'VETERAN',
      readingTime: '5-6 hours',
      rating: 4.6,
      amazonUrl: '#'
    },
    {
      id: 'book-5',
      title: 'The Rational Male',
      author: 'Rollo Tomassi',
      category: 'MASCULINITY',
      description: 'Red pill psychology and intersexual dynamics. Understanding male-female relationships from a masculine perspective.',
      keyLessons: [
        'Hypergamy and female sexual strategy',
        'The importance of maintaining frame',
        'Alpha and beta behavioral patterns'
      ],
      difficulty: 'ELITE',
      readingTime: '10-12 hours',
      rating: 4.2,
      amazonUrl: '#'
    },
    {
      id: 'book-6',
      title: 'The 48 Laws of Power',
      author: 'Robert Greene',
      category: 'SELF_IMPROVEMENT',
      description: 'Strategic lessons from history\'s most powerful figures. Master the subtle art of power and influence.',
      keyLessons: [
        'Never outshine the master',
        'Court attention at all costs',
        'Get others to do the work but take the credit'
      ],
      difficulty: 'ELITE',
      readingTime: '15-20 hours',
      rating: 4.4,
      amazonUrl: '#'
    },
    {
      id: 'book-7',
      title: 'Iron John',
      author: 'Robert Bly',
      category: 'MASCULINITY',
      description: 'A poetic exploration of masculine initiation and the journey from boy to man through mythological wisdom.',
      keyLessons: [
        'The importance of male mentorship',
        'Understanding the wild man within',
        'Breaking away from the mother complex'
      ],
      difficulty: 'VETERAN',
      readingTime: '6-8 hours',
      rating: 4.1,
      amazonUrl: '#'
    },
    {
      id: 'book-8',
      title: 'Discipline Equals Freedom',
      author: 'Jocko Willink',
      category: 'MENTAL_TOUGHNESS',
      description: 'Field manual for mental toughness and discipline. Wake up early, work hard, stay disciplined.',
      keyLessons: [
        'Discipline equals freedom',
        'Default aggressive mentality',
        'The path of discipline and delayed gratification'
      ],
      difficulty: 'SOLDIER',
      readingTime: '3-4 hours',
      rating: 4.5,
      amazonUrl: '#'
    },
    {
      id: 'book-9',
      title: 'Man\'s Search for Meaning',
      author: 'Viktor Frankl',
      category: 'PHILOSOPHY',
      description: 'Finding meaning in suffering. Holocaust survivor\'s guide to finding purpose in the darkest circumstances.',
      keyLessons: [
        'Man can endure any suffering if he finds meaning in it',
        'We cannot avoid suffering but we can choose how to cope',
        'Responsibility and freedom are inextricably linked'
      ],
      difficulty: 'VETERAN',
      readingTime: '4-5 hours',
      rating: 4.7,
      amazonUrl: '#'
    },
    {
      id: 'book-10',
      title: 'Wild at Heart',
      author: 'John Eldredge',
      category: 'MASCULINITY',
      description: 'Discovering the secret of a man\'s soul. Adventure, battle, and beauty in masculine spirituality.',
      keyLessons: [
        'Every man needs an adventure',
        'Every man needs a battle to fight',
        'Every man needs a beauty to rescue'
      ],
      difficulty: 'RECRUIT',
      readingTime: '5-6 hours',
      rating: 4.0,
      amazonUrl: '#'
    }
  ];

  useEffect(() => {
    setBooks(tacticalBooks);
    
    // Load saved data
    const savedReadingList = localStorage.getItem('reading-list');
    const savedReadBooks = localStorage.getItem('read-books');
    const savedGoal = localStorage.getItem('reading-goal');
    
    if (savedReadingList) setReadingList(JSON.parse(savedReadingList));
    if (savedReadBooks) setReadBooks(JSON.parse(savedReadBooks));
    if (savedGoal) setReadingGoal(JSON.parse(savedGoal));
  }, []);

  useEffect(() => {
    localStorage.setItem('reading-list', JSON.stringify(readingList));
  }, [readingList]);

  useEffect(() => {
    localStorage.setItem('read-books', JSON.stringify(readBooks));
  }, [readBooks]);

  useEffect(() => {
    localStorage.setItem('reading-goal', JSON.stringify(readingGoal));
  }, [readingGoal]);

  const addToReadingList = (bookId: string) => {
    if (!readingList.includes(bookId)) {
      setReadingList(prev => [...prev, bookId]);
    }
  };

  const removeFromReadingList = (bookId: string) => {
    setReadingList(prev => prev.filter(id => id !== bookId));
  };

  const markAsRead = (bookId: string) => {
    if (!readBooks.includes(bookId)) {
      setReadBooks(prev => [...prev, bookId]);
      setReadingGoal(prev => ({ ...prev, currentMonth: prev.currentMonth + 1 }));
    }
    removeFromReadingList(bookId);
  };

  const markAsUnread = (bookId: string) => {
    setReadBooks(prev => prev.filter(id => id !== bookId));
    setReadingGoal(prev => ({ ...prev, currentMonth: Math.max(0, prev.currentMonth - 1) }));
  };

  const getDifficultyColor = (difficulty: Book['difficulty']) => {
    switch (difficulty) {
      case 'RECRUIT': return 'text-green-400 border-green-400';
      case 'SOLDIER': return 'text-yellow-400 border-yellow-400';
      case 'VETERAN': return 'text-orange-400 border-orange-400';
      case 'ELITE': return 'text-red-400 border-red-400';
    }
  };

  const getCategoryIcon = (category: Book['category']) => {
    switch (category) {
      case 'MASCULINITY': return '⚔️';
      case 'LEADERSHIP': return '👑';
      case 'MENTAL_TOUGHNESS': return '💪';
      case 'PHILOSOPHY': return '🏛️';
      case 'SELF_IMPROVEMENT': return '📈';
      case 'BIOGRAPHY': return '📖';
      default: return '📚';
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'ALL' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (viewMode === 'reading') {
      return readingList.includes(book.id) && matchesCategory && matchesSearch;
    } else if (viewMode === 'completed') {
      return readBooks.includes(book.id) && matchesCategory && matchesSearch;
    }
    
    return matchesCategory && matchesSearch;
  });

  const getProgressPercentage = () => {
    return readingGoal.booksPerMonth > 0 ? (readingGoal.currentMonth / readingGoal.booksPerMonth) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-2 border-red-600/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-500 mb-2">[ KNOWLEDGE ARSENAL ]</h1>
            <div className="text-gray-400">Tactical Reading • {books.length} Books Available</div>
          </div>
          <div className="flex space-x-2">
            {['catalog', 'reading', 'completed'].map(mode => (
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

      {/* Reading Goal Progress */}
      <div className="p-6 border-b border-gray-800">
        <div className="bg-gray-900 border border-blue-600/30 p-4 rounded-none">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-blue-400">Monthly Reading Target</h3>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={readingGoal.booksPerMonth}
                onChange={(e) => setReadingGoal(prev => ({ ...prev, booksPerMonth: parseInt(e.target.value) || 0 }))}
                className="w-16 bg-black border border-gray-600 text-white p-2 rounded-none text-center font-mono"
                min="1"
                max="10"
              />
              <span className="text-gray-400">books/month</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-700 rounded-none h-3 overflow-hidden">
              <div 
                className={`h-full transition-all ${getProgressPercentage() >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(getProgressPercentage(), 100)}%` }}
              ></div>
            </div>
            <span className="text-white font-bold min-w-[80px]">
              {readingGoal.currentMonth} / {readingGoal.booksPerMonth}
            </span>
            <span className={`text-sm ${getProgressPercentage() >= 100 ? 'text-green-400' : 'text-blue-400'}`}>
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 SEARCH TACTICAL KNOWLEDGE..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-900 border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono"
          >
            <option value="ALL">ALL CATEGORIES</option>
            <option value="MASCULINITY">⚔️ MASCULINITY</option>
            <option value="LEADERSHIP">👑 LEADERSHIP</option>
            <option value="MENTAL_TOUGHNESS">💪 MENTAL TOUGHNESS</option>
            <option value="PHILOSOPHY">🏛️ PHILOSOPHY</option>
            <option value="SELF_IMPROVEMENT">📈 SELF IMPROVEMENT</option>
            <option value="BIOGRAPHY">📖 BIOGRAPHY</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 border-b border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border border-green-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-green-400">{readBooks.length}</div>
            <div className="text-sm text-gray-400">COMPLETED</div>
          </div>
          <div className="bg-gray-900 border border-yellow-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-yellow-400">{readingList.length}</div>
            <div className="text-sm text-gray-400">IN QUEUE</div>
          </div>
          <div className="bg-gray-900 border border-blue-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-blue-400">{books.length - readBooks.length}</div>
            <div className="text-sm text-gray-400">AVAILABLE</div>
          </div>
          <div className="bg-gray-900 border border-purple-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-purple-400">{Math.round(getProgressPercentage())}%</div>
            <div className="text-sm text-gray-400">MONTHLY PROGRESS</div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="p-6">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📚</div>
            <div className="text-xl mb-2">No books found</div>
            <div>Adjust your filters or search terms</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-gray-900 border border-gray-600 rounded-none p-6 hover:border-red-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getCategoryIcon(book.category)}</span>
                    <span className={`text-xs px-2 py-1 border rounded-none ${getDifficultyColor(book.difficulty)}`}>
                      {book.difficulty}
                    </span>
                  </div>
                  <div className="text-yellow-400">
                    {'★'.repeat(Math.floor(book.rating))}
                    {book.rating % 1 >= 0.5 ? '☆' : ''}
                    <span className="text-gray-500 text-xs ml-1">({book.rating})</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{book.title}</h3>
                <p className="text-gray-400 text-sm mb-3">by {book.author}</p>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{book.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-bold text-gray-400 mb-2">KEY TACTICAL INSIGHTS:</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {book.keyLessons.slice(0, 2).map((lesson, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">▶</span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>📖 {book.readingTime}</span>
                  <span>{book.category.replace('_', ' ')}</span>
                </div>

                <div className="flex space-x-2">
                  {readBooks.includes(book.id) ? (
                    <button
                      onClick={() => markAsUnread(book.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 text-xs rounded-none transition-all font-mono"
                    >
                      ✓ COMPLETED
                    </button>
                  ) : readingList.includes(book.id) ? (
                    <div className="flex space-x-2 flex-1">
                      <button
                        onClick={() => markAsRead(book.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 text-xs rounded-none transition-all font-mono"
                      >
                        ✓ MARK READ
                      </button>
                      <button
                        onClick={() => removeFromReadingList(book.id)}
                        className="px-3 bg-gray-600 hover:bg-gray-700 text-white py-2 text-xs rounded-none transition-all font-mono"
                      >
                        ✗
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToReadingList(book.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 text-xs rounded-none transition-all font-mono"
                    >
                      + ADD TO QUEUE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}