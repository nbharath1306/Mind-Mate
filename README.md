# 🧠 MindMate - Men's Mental Health Platform

**"Because strength also means speaking up."**

MindMate is a comprehensive mental health platform designed specifically for men, providing a safe, anonymous space to track emotional wellness, journal thoughts, and connect with a supportive community.

## 🎯 Features

### Core Features (MVP)
- **🧭 Mood Tracking**: Daily emotional check-ins with insights and patterns
- **📝 Smart Journaling**: AI-powered prompts for guided reflection
- **🤝 Anonymous Community**: Safe peer support spaces by category
- **🧘‍♂️ Wellness Content**: Mindfulness routines and growth capsules
- **🔒 Privacy First**: Complete anonymity with secure data handling

### Target Users
- 🎓 **Students**: College/university students dealing with academic stress
- 💼 **Young Professionals**: Men aged 20-30 facing career pressures
- 💬 **Community Seekers**: Anyone looking for peer support and connection

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS + Custom Design System
- **Backend**: Firebase (Auth, Firestore, Functions)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel + Firebase Hosting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Firebase account for backend services
- Git for version control

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd Mind-Mate

# Install dependencies
npm install
# or
yarn install
```

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable the following services:
   - **Authentication** (Google + Anonymous)
   - **Firestore Database**
   - **Storage**
3. Get your Firebase configuration from Project Settings

### 3. Environment Configuration

```bash
# Copy the environment template
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see MindMate in action! 🎉

## 📁 Project Structure

```
Mind-Mate/
├── app/                    # Next.js 14 App Router
│   ├── dashboard/         # Dashboard pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── providers/         # Context providers
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities and configurations
│   └── firebase.ts       # Firebase configuration
├── styles/               # Global styles
│   └── globals.css       # TailwindCSS + custom styles
├── types/                # TypeScript type definitions
│   └── index.ts          # App-wide type definitions
└── public/               # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #0ea5e9 (Calming, trustworthy)
- **Navy**: #334155 (Professional, strong)
- **Teal**: #14b8a6 (Healing, growth)
- **Grays**: Various shades for backgrounds and text

### Typography
- **Primary**: Inter (readable, modern)
- **Display**: Poppins (friendly, approachable)

### Components
- Dark mode by default
- Gentle animations with Framer Motion
- Accessible and responsive design

## 🔐 Privacy & Security

MindMate prioritizes user privacy:

- **Anonymous Mode**: Users can participate completely anonymously
- **Private Journaling**: All entries are private by default
- **Secure Storage**: Firebase security rules protect user data
- **No Tracking**: Minimal analytics, no user behavior tracking

## 🚀 Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
```

### Manual Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📈 Roadmap

### Phase 1 (Current MVP)
- [x] User authentication (Google + Anonymous)
- [x] Mood tracking system
- [x] Journaling with prompts
- [x] Community feed
- [x] Responsive design

### Phase 2 (Next 2-3 months)
- [ ] Professional counselor integration
- [ ] Advanced mood analytics
- [ ] Audio journaling
- [ ] Push notifications
- [ ] Mobile app (React Native)

### Phase 3 (6+ months)
- [ ] AI-powered insights
- [ ] Video support groups
- [ ] College partnerships
- [ ] Advanced wellness content

## 📊 Success Metrics

- **Daily Active Users**: Track engagement
- **Retention Rates**: 7-day and 30-day retention
- **Journal Entries**: Average entries per user per week
- **Community Engagement**: Posts, replies, and peer support

## 🆘 Support

### For Users
- In-app help and resources
- Community guidelines and safety
- Crisis intervention resources

### For Developers
- Check the [Issues](../../issues) page
- Join our development discussions
- Read the contributing guide

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Mental health advocates and professionals who guided the design
- The open-source community for amazing tools and libraries
- Beta testers who provided invaluable feedback

---

**Remember: This is more than just code - it's a mission to support men's mental health.** 💪🧠

Built with ❤️ for mental wellness and community support.