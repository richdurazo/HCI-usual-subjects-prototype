# Smart Tailoring Recommender - HCI Prototype

A functional prototype for an HCI group project that helps users tailor their resume to specific job postings. This tool provides intelligent suggestions, real-time alignment feedback, and guided improvements to optimize resume content for job applications.

## 🚀 Live Demo

**Try it now:** [http://hci-prototype.s3-website-us-east-1.amazonaws.com/](http://hci-prototype.s3-website-us-east-1.amazonaws.com/)

## Overview

The Smart Tailoring Recommender is a resume optimization assistant that analyzes a user's resume against a job description and provides actionable suggestions to improve alignment. The prototype demonstrates a complete workflow from viewing a job posting to receiving personalized rewrite suggestions and applying improvements.

## Features

### 🎯 Core Functionality

- **Job Posting View**: LinkedIn-style job posting page with detailed requirements
- **Resume Analysis**: Split-screen view showing your resume alongside tailored suggestions
- **Dynamic Requirement Coverage**: Real-time alignment tracking that updates as you make changes
- **Smart Suggestions**: Categorized recommendations (High Impact, Skill Match, Quick Fix, Missing Requirement)

### ✨ Key Features

- **Alignment Status Bar**: Visual progress indicator showing requirement coverage with expandable breakdown
- **Suggestion Cards**: Collapsible accordions for "Job Comparison" and "Rewrite Variants"
- **Quick Edit Tools**: Lightweight improvement buttons that apply targeted fixes without full rewrites
- **Embedded Translator**: Three rewrite variants (action-focused, impact-focused, JD-aligned) with explanations
- **Done Section**: Completed suggestions automatically move to a "Done" section
- **Visual Feedback**: Green highlight animations on recently changed resume bullets
- **Toast Notifications**: Success messages for all user actions
- **Insights Sidebar**: Comprehensive analysis panel with Overview and Skills Mapping tabs
- **Inline Editing**: Direct editing of resume bullets with save/cancel functionality

## Tech Stack

- **React 18.3.1** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Styling
- **Radix UI** - Accessible component primitives
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── LandingView.jsx          # Job posting page
│   ├── AnalysisView.jsx          # Main analysis interface
│   ├── AlignmentStatusBar.jsx   # Requirement coverage indicator
│   ├── SuggestionsListView.jsx   # List of suggestions with filters
│   ├── SuggestionCard.jsx       # Individual suggestion card
│   ├── QuickEditTools.jsx       # Quick action buttons
│   ├── InsightsSidebar.jsx      # Analysis panel sidebar
│   ├── ResumeLevelInsights.jsx  # Overview tab content
│   ├── SkillsToEvidenceTracker.jsx # Skills mapping tab
│   ├── KeywordHighlighter.jsx   # Interactive keyword highlighting
│   └── ui/                      # Reusable UI components
├── App.jsx                       # Main app component
├── main.jsx                      # Entry point
└── index.css                     # Global styles
```

## Usage

1. **View Job Posting**: Start on the landing page to see the job description and requirements
2. **Navigate to Analysis**: Click "Upload Resume" or "Analyze Resume" to enter the analysis view
3. **Review Suggestions**: Browse categorized suggestions in the right panel
4. **Explore Details**: 
   - Click "Show Job Comparison" to see keyword matching
   - Click "Show Rewrite Variants" to see alternative rewrites
   - Use Quick Edit Tools for fast improvements
5. **Apply Changes**: Click "Apply This Rewrite" or use quick actions to update your resume
6. **Track Progress**: Watch the Requirement Coverage bar update in real-time
7. **View Insights**: Click "Show Insights" to see detailed analysis and skills mapping

## Key Interactions

- **Quick Actions**: Apply targeted improvements (Add metric, Strengthen verb, etc.) - automatically moves to "Done" when all actions are used
- **Rewrite Variants**: Select from three different rewrite styles optimized for different goals
- **Inline Editing**: Click any resume bullet to edit directly
- **Visual Feedback**: Recently changed bullets highlight in green and fade after 3 seconds
- **Toast Notifications**: Confirmation messages for all actions (copy, apply, save)

## Design Principles

This prototype follows HCI best practices:

- **Progressive Disclosure**: Collapsible sections reduce cognitive load
- **Clear Feedback**: Visual indicators and notifications for all actions
- **User Control**: Editable resume bullets and choice of rewrite variants
- **Transparency**: Explanations for why suggestions are made
- **Reduced Clutter**: Accordions default to collapsed, completed items move to "Done"

## Based On

This prototype is based on research and design work documented in `paper.tex`, incorporating insights from user needfinding, heuristic evaluation, and iterative design processes.

## License

This is a prototype for academic/research purposes.
