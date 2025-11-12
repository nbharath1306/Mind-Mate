# 🚀 MindMate Deployment Guide

This guide will help you deploy MindMate to production using Vercel for the frontend and Firebase for the backend services.

## 📋 Prerequisites

- ✅ Firebase project set up with Authentication, Firestore, and Storage enabled
- ✅ Vercel account (free tier works great)
- ✅ GitHub repository with your MindMate code
- ✅ Node.js 18+ installed locally

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or use existing project
3. Follow the setup wizard

### 2. Enable Required Services

#### Authentication
1. Go to Authentication → Sign-in method
2. Enable **Google** sign-in provider
3. Enable **Anonymous** sign-in
4. Add your domain to authorized domains (e.g., `yourdomain.vercel.app`)

#### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select your preferred location

#### Storage
1. Go to Storage
2. Click "Get started"
3. Choose "Start in test mode"

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add a web app
4. Register app with name "MindMate"
5. Copy the config object - you'll need these values

### 4. Deploy Security Rules

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Set your project ID in .firebaserc
# Replace "your-project-id" with your actual project ID

# Deploy Firestore rules and indexes
firebase deploy --only firestore
```

## ▲ Vercel Deployment

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing MindMate

### 2. Configure Build Settings

Vercel should auto-detect Next.js, but verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

### 3. Environment Variables

Add these environment variables in Vercel:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_here
```

**To add environment variables:**
1. Go to your project settings in Vercel
2. Click "Environment Variables"
3. Add each variable with its value
4. Make sure to add them for Production, Preview, and Development

### 4. Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete (usually 2-3 minutes)
3. Your app will be available at `https://your-app-name.vercel.app`

## 🔒 Security Configuration

### 1. Update Firebase Auth Domain

1. Go to Firebase Console → Authentication → Settings
2. Add your Vercel domain to "Authorized domains"
3. Example: `your-app-name.vercel.app`

### 2. Update CORS Settings

In Firebase Console → Storage → Rules, update if using storage:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🔍 Post-Deployment Checklist

### ✅ Functionality Tests
- [ ] Landing page loads correctly
- [ ] Google sign-in works
- [ ] Anonymous sign-in works
- [ ] Dashboard displays properly
- [ ] Mood tracking saves data
- [ ] Journal entries save and display
- [ ] Community posts load and can be created
- [ ] Mobile responsiveness works

### ✅ Performance Tests
- [ ] Page load times are acceptable (< 3 seconds)
- [ ] Images and assets load properly
- [ ] No console errors in browser
- [ ] Firebase connection works

### ✅ Security Tests
- [ ] Firestore rules prevent unauthorized access
- [ ] Users can only see their own mood/journal data
- [ ] Community posts are properly moderated
- [ ] Authentication works correctly

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel automatically deploys when you push to your main branch:

1. Make changes to your code
2. Commit and push to GitHub
3. Vercel automatically builds and deploys
4. Check deployment status in Vercel dashboard

### Manual Deployments
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your local machine
vercel --prod
```

## 📊 Monitoring & Analytics

### 1. Vercel Analytics
Enable Vercel Analytics for performance monitoring:
1. Go to your project in Vercel
2. Click "Analytics" tab
3. Enable analytics

### 2. Firebase Analytics (Optional)
Add Firebase Analytics for user behavior:
1. Enable Analytics in Firebase Console
2. Add Analytics to your Firebase config
3. Update your Next.js app to include Analytics

### 3. Error Monitoring
Consider adding Sentry or similar for error tracking:
```bash
npm install @sentry/nextjs
```

## 🚨 Troubleshooting

### Common Issues

**Build Fails on Vercel**
- Check that all dependencies are in `package.json`
- Verify environment variables are set correctly
- Check build logs for specific errors

**Firebase Authentication Not Working**
- Verify authorized domains include your Vercel domain
- Check that Firebase config environment variables are correct
- Ensure Firebase project has Authentication enabled

**Firestore Permission Denied**
- Check that security rules are deployed
- Verify user is authenticated before accessing data
- Test rules in Firebase Console simulator

**Slow Performance**
- Enable Vercel Edge Functions for better performance
- Optimize images and assets
- Use Firebase Performance Monitoring

### Getting Help

1. **Vercel Support**: Check [Vercel Documentation](https://vercel.com/docs)
2. **Firebase Support**: Check [Firebase Documentation](https://firebase.google.com/docs)
3. **Community**: Join the MindMate community discussions
4. **GitHub Issues**: Report bugs in the repository

## 🎉 Success!

Once deployed, your MindMate app will be live and ready to help users with their mental health journey! 

Remember to:
- Monitor performance and errors
- Update dependencies regularly
- Back up your Firebase data
- Collect user feedback for improvements

**Your MindMate deployment is complete! 🧠💪**