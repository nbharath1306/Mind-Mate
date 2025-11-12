# Contributing to MindMate

Thank you for your interest in contributing to MindMate! This project aims to support men's mental health, and every contribution helps make a meaningful impact.

## 🎯 Project Mission

MindMate is more than just code - it's a mission to create a safe, supportive platform for men's mental health. We believe that strength also means speaking up, and we're building tools to make that easier.

## 🤝 How to Contribute

### Ways to Contribute

1. **Code Contributions**
   - Bug fixes
   - Feature implementations
   - Performance improvements
   - UI/UX enhancements

2. **Documentation**
   - Improve README files
   - Add code comments
   - Create tutorials
   - Write deployment guides

3. **Design & UX**
   - UI improvements
   - Accessibility enhancements
   - Mobile responsiveness
   - User experience feedback

4. **Testing**
   - Write unit tests
   - Integration testing
   - User acceptance testing
   - Bug reporting

5. **Content**
   - Mental health resources
   - Journaling prompts
   - Community guidelines
   - Wellness content

## 🚀 Getting Started

### 1. Fork the Repository

1. Fork the MindMate repository
2. Clone your fork locally
3. Set up the development environment

### 2. Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/Mind-Mate.git
cd Mind-Mate

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Set up Firebase (see README.md for details)
# Add your Firebase configuration to .env.local

# Start development server
npm run dev
```

### 3. Development Workflow

1. Create a new branch for your feature
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. Make your changes
3. Test your changes locally
4. Commit with clear, descriptive messages
5. Push to your fork
6. Open a Pull Request

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Code formatting is enforced
- **Naming**: Use descriptive variable and function names

### Component Guidelines

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript interfaces for props
- Include error handling
- Add loading states where appropriate

### State Management

- Use React hooks for local state
- Firebase for persistent data
- Context API for global state when needed

### Styling

- Use TailwindCSS for styling
- Follow the existing design system
- Ensure mobile responsiveness
- Test in dark mode (default)

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features
- Include edge cases
- Test error handling
- Mock external dependencies (Firebase)

## 🔒 Security & Privacy

Given the sensitive nature of mental health data:

- Never log personal information
- Follow privacy-by-design principles
- Test security rules thoroughly
- Report security issues privately

## 📝 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] Breaking changes are documented
- [ ] Security implications considered

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] Manual testing completed
- [ ] No regressions introduced

## Screenshots (if applicable)
Add screenshots of UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings/errors
```

### Review Process

1. Automated checks must pass
2. At least one maintainer review required
3. Address feedback promptly
4. Squash commits before merge

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Try latest version
3. Reproduce consistently
4. Check documentation

### Bug Report Template

```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment**
- Browser: 
- Version:
- Device:
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Problem Statement**
What problem does this solve?

**Proposed Solution**
Describe your solution

**Alternatives Considered**
Other approaches considered

**Mental Health Impact**
How does this support our mission?
```

## 🌟 Recognition

Contributors will be recognized in:
- README contributor section
- Release notes
- Social media acknowledgments

## 📞 Getting Help

- **GitHub Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Discord**: Community chat (coming soon)
- **Email**: maintainers@mindmate.com

## 📖 Resources

### Mental Health Resources
- [National Suicide Prevention Lifeline](https://suicidepreventionlifeline.org/)
- [Crisis Text Line](https://www.crisistextline.org/)
- [Mental Health America](https://www.mhanational.org/)

### Development Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🙏 Thank You

Every contribution, no matter how small, helps create a more supportive world for men's mental health. Thank you for being part of this mission!

---

**Remember: This project deals with sensitive mental health topics. Always approach contributions with empathy, respect, and care for our users' wellbeing.** 💙