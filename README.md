# LexiTune - Adaptive AI Multisensory Reading Platform

LexiTune is an adaptive, multisensory reading platform built on the Orton-Gillingham approach—designed for neurodivergent learners who thrive through listening, reading, and doing.

## 🎯 Mission

To provide personalized, AI-enhanced reading support that combines proven Orton-Gillingham methodology with modern adaptive technology, making reading accessible and effective for neurodivergent learners.

## ✨ Features

- **Adaptive AI Learning**: Personalized instruction that adapts to each learner's needs
- **Multisensory Approach**: Combines visual, auditory, and kinesthetic learning methods
- **Orton-Gillingham Foundation**: Built on proven reading intervention methodology
- **Video Tutorials**: Comprehensive video guides for reading skills development
- **Progress Tracking**: Data-driven insights into learning progress
- **24/7 Support**: Round-the-clock access to learning resources

## 🚀 Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Deployment**: Cloudflare Pages
- **Database**: Convex (real-time database)
- **Authentication**: WorkOS
- **AI Integration**: OpenAI GPT models

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # User dashboard
│   ├── videos/           # Video tutorials page
│   └── api/              # API routes
├── components/           # React components
│   ├── ui/              # UI components (Shadcn)
│   └── ...              # Feature components
├── convex/              # Convex database functions
├── lib/                 # Utility functions
└── public/              # Static assets
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Bun (recommended) or npm
- Convex account
- Cloudflare account

### Setup
1. Clone the repository
2. Install dependencies: `bun install`
3. Set up environment variables
4. Run development server: `bun dev`

### Environment Variables
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
WORKOS_API_KEY=your_workos_key
OPENAI_API_KEY=your_openai_key
```

## 🚀 Deployment

This project is configured for deployment on Cloudflare Pages with the following features:

- **Automatic builds** on push to main branch
- **Preview deployments** for pull requests
- **Edge functions** for server-side logic
- **KV storage** for form submissions
- **Global CDN** for fast worldwide access

## 📊 Analytics & SEO

- **Structured data** for search engines
- **Open Graph** meta tags for social sharing
- **Performance monitoring** with Core Web Vitals
- **Accessibility** compliance (WCAG 2.1)

## 🤝 Contributing

This is a specialized platform for dyslexia support. Contributions should focus on:

- Improving accessibility features
- Enhancing AI learning algorithms
- Expanding video tutorial content
- Optimizing user experience for neurodivergent learners

## 📄 License

Proprietary - All rights reserved by TEKIMAX Research & Development

## 🆘 Support

For technical support or questions about LexiTune, please contact the development team.

---

**Built with ❤️ for neurodivergent learners**
