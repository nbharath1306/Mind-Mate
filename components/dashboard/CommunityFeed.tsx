'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Plus, 
  Filter,
  Clock,
  TrendingUp,
  BookOpen,
  Target,
  Coffee,
  Briefcase,
  Home
} from 'lucide-react';
import { CommunityPost } from '@/types';
import { useAuth } from '@/components/providers/AuthProvider';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export function CommunityFeed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' as const });

  const categories = [
    { id: 'all', label: 'All Posts', icon: Users },
    { id: 'study-stress', label: 'Study Stress', icon: BookOpen },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'relationships', label: 'Relationships', icon: Heart },
    { id: 'motivation', label: 'Motivation', icon: Target },
    { id: 'anxiety', label: 'Anxiety', icon: Coffee },
    { id: 'general', label: 'General', icon: MessageCircle },
  ];

  // Mock data - in real app, this would come from Firebase
  useEffect(() => {
    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        userId: 'user1',
        authorName: 'Mindful Student',
        title: 'Finally talked to my professor about my anxiety',
        content: 'Been struggling with presentation anxiety all semester. Today I finally reached out to my prof and they were so understanding. Sometimes we build things up in our heads way more than they actually are.',
        category: 'study-stress',
        tags: ['anxiety', 'college', 'breakthrough'],
        likes: 23,
        likedBy: [],
        replies: [
          {
            id: 'r1',
            userId: 'user2',
            authorName: 'Anonymous Warrior',
            content: 'That takes real courage, man. Proud of you for speaking up!',
            likes: 5,
            likedBy: [],
            createdAt: new Date(Date.now() - 3600000),
          }
        ],
        isAnonymous: true,
        createdAt: new Date(Date.now() - 7200000),
        updatedAt: new Date(Date.now() - 7200000),
      },
      {
        id: '2',
        userId: 'user2',
        authorName: 'Focused Fighter',
        title: 'Small win: Went to the gym after a rough day',
        content: 'Work was absolutely brutal today. Deadline stress, difficult clients, the whole package. But instead of just going home and doom-scrolling, I forced myself to hit the gym. Feel so much better now.',
        category: 'motivation',
        tags: ['exercise', 'stress-relief', 'self-care'],
        likes: 18,
        likedBy: [],
        replies: [],
        isAnonymous: true,
        createdAt: new Date(Date.now() - 14400000),
        updatedAt: new Date(Date.now() - 14400000),
      },
      {
        id: '3',
        userId: 'user3',
        authorName: 'Reflective Mind',
        title: 'Anyone else feel like they\'re behind in life?',
        content: 'I\'m 25 and seeing all my friends getting promotions, buying houses, getting married. I know everyone goes at their own pace, but man, the comparison game is real. How do you guys deal with this?',
        category: 'anxiety',
        tags: ['comparison', 'life-direction', 'quarter-life-crisis'],
        likes: 31,
        likedBy: [],
        replies: [
          {
            id: 'r2',
            userId: 'user4',
            authorName: 'Wise Wanderer',
            content: 'I felt this way at 25 too. At 30 now, I realize how much pressure I put on myself for arbitrary timelines. Your journey is yours, not theirs.',
            likes: 12,
            likedBy: [],
            createdAt: new Date(Date.now() - 1800000),
          }
        ],
        isAnonymous: true,
        createdAt: new Date(Date.now() - 21600000),
        updatedAt: new Date(Date.now() - 21600000),
      }
    ];
    setPosts(mockPosts);
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleLikePost = async (postId: string) => {
    try {
      // TODO: Update Firebase
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes + 1 }
            : post
        )
      );
      toast.success('Post liked! ❤️');
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    try {
      // TODO: Save to Firebase
      const post: CommunityPost = {
        id: Date.now().toString(),
        userId: user?.id || '',
        authorName: user?.isAnonymous ? 'Anonymous Warrior' : user?.displayName || 'Community Member',
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        category: newPost.category,
        tags: extractTags(newPost.content),
        likes: 0,
        likedBy: [],
        replies: [],
        isAnonymous: user?.isAnonymous || false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setPosts(prevPosts => [post, ...prevPosts]);
      setNewPost({ title: '', content: '', category: 'general' });
      setIsCreatingPost(false);
      toast.success('Post created! 🎉');
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  const extractTags = (text: string): string[] => {
    const keywords = ['stress', 'anxiety', 'work', 'study', 'gym', 'exercise', 'relationship', 'family', 'motivation', 'goals', 'depression', 'therapy'];
    return keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 3);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : MessageCircle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Users className="h-6 w-6 mr-3 text-primary-500" />
          Community Support
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreatingPost(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Share Your Story</span>
        </motion.button>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Create Post Modal */}
      {isCreatingPost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Share Your Experience</h3>
          
          <div className="space-y-4">
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What's your story about?"
              className="input"
            />

            <select
              value={newPost.category}
              onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value as any }))}
              className="input"
            >
              {categories.slice(1).map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>

            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your experience, ask for advice, or offer support to others..."
              className="input resize-none h-32"
            />

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsCreatingPost(false)}
                className="btn-ghost flex-1"
              >
                Cancel
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreatePost}
                className="btn-primary flex-1"
              >
                Share Post
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post, index) => {
          const CategoryIcon = getCategoryIcon(post.category);
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:border-navy-600 transition-colors"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {post.authorName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{post.authorName}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <CategoryIcon className="h-3 w-3" />
                      <span>{categories.find(c => c.id === post.category)?.label}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{format(post.createdAt, 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-navy-700 text-gray-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-navy-700">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </motion.button>
                  
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.replies.length}</span>
                  </button>
                </div>

                <button className="text-gray-400 hover:text-white text-sm transition-colors">
                  Reply
                </button>
              </div>

              {/* Replies */}
              {post.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l border-navy-600 space-y-3">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="bg-navy-800 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white text-sm">{reply.authorName}</span>
                        <span className="text-xs text-gray-400">
                          {format(reply.createdAt, 'MMM d, h:mm a')}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{reply.content}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 text-xs">
                          <Heart className="h-3 w-3" />
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No posts yet in this category</h3>
          <p>Be the first to share your experience and start a conversation!</p>
        </div>
      )}
    </div>
  );
}