import { useState } from 'react'
import './index.css'
import { LandingView } from './components/LandingView'
import { AnalysisView } from './components/AnalysisView'
import { InsightsSidebar } from './components/InsightsSidebar'
import { BarChart3 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Toaster } from 'sonner'

function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [showInsights, setShowInsights] = useState(false)

  const handleAnalyzeResume = () => {
    // Navigate to analysis view
    setCurrentView('analysis')
  }

  const handleBackToLanding = () => {
    setCurrentView('landing')
  }

  return (
    <div className="dark h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-5 py-2.5 sticky top-0 z-50">
        {currentView === 'landing' ? (
          <div className="flex items-center justify-between">
            <h1 className="text-gray-100 text-sm font-medium">Usable Suspects Tailoring Assistant</h1>

          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-100 text-sm font-medium">Smart Tailoring Recommender</h1>
              <p className="text-gray-400 text-xs mt-0.5">
                Launched from split screen resume to job mapper • Mode: rewriting a single resume bullet
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInsights(!showInsights)}
                className="text-xs border-blue-800 text-blue-400 hover:bg-blue-950 flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                {showInsights ? 'Hide' : 'Show'} Insights
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Render current view */}
      {currentView === 'landing' ? (
        <LandingView 
          onAnalyzeResume={handleAnalyzeResume}
        />
      ) : (
        <>
          <AnalysisView onBack={handleBackToLanding} />
          <InsightsSidebar isOpen={showInsights} onClose={() => setShowInsights(false)} />
        </>
      )}

      {/* Toast Notifications */}
      <Toaster position="bottom-right" theme="dark" richColors />

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 px-5 py-3 flex items-center justify-between">
        {currentView === 'analysis' && (
          <Button
            onClick={handleBackToLanding}
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-950 hover:border-blue-500 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Job Posting
          </Button>
        )}
        <div className="ml-auto">
          <button className="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors" aria-label="Help">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M10 14V10M10 6H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
