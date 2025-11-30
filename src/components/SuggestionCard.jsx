import { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { TrendingUp, Zap, Target, AlertCircle, X, Star, Check, Copy, ChevronDown, ChevronUp, Lightbulb, Info } from 'lucide-react'
import { KeywordHighlighter } from './KeywordHighlighter'
import { QuickEditTools } from './QuickEditTools'
import { toast } from 'sonner'

export function SuggestionCard({ suggestion, onDismiss, onApplyRewrite, onQuickEdit, usedQuickActions = [] }) {
  const [activeTab, setActiveTab] = useState('overview') // 'overview' or 'rewrite'
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [highlightedKeyword, setHighlightedKeyword] = useState(null)
  const [showJobComparison, setShowJobComparison] = useState(false) // Default to collapsed to reduce visual clutter
  const [showVariants, setShowVariants] = useState(false) // Default to collapsed to reduce visual clutter

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high-impact':
        return {
          label: 'High Impact',
          className: 'bg-purple-950 text-purple-300 border-purple-800',
          icon: <TrendingUp className="w-3 h-3" />,
        }
      case 'quick-fix':
        return {
          label: 'Quick Fix',
          className: 'bg-green-950 text-green-300 border-green-800',
          icon: <Zap className="w-3 h-3" />,
        }
      case 'skill-match':
        return {
          label: 'Skill Match',
          className: 'bg-blue-950 text-blue-300 border-blue-800',
          icon: <Target className="w-3 h-3" />,
        }
      case 'missing-requirement':
        return {
          label: 'Missing Requirement',
          className: 'bg-red-950 text-red-300 border-red-800',
          icon: <AlertCircle className="w-3 h-3" />,
        }
      default:
        return {
          label: 'Standard',
          className: 'bg-gray-800 text-gray-300 border-gray-700',
          icon: null,
        }
    }
  }

  const priorityConfig = getPriorityConfig(suggestion.priority)
  const isHighPriority = suggestion.isTopPriority || suggestion.priority === 'high-impact' || suggestion.priority === 'missing-requirement'
  
  const finalRewrite = selectedVariant 
    ? suggestion.alternatives?.find(a => a.id === selectedVariant)?.text || suggestion.suggestedRewrite
    : suggestion.suggestedRewrite

  const handleApply = () => {
    if (onApplyRewrite) {
      onApplyRewrite(finalRewrite)
      // Toast notification is handled in AnalysisView.handleApplyRewrite
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalRewrite)
      toast.success('Copied to clipboard!', {
        description: 'The rewrite text has been copied.',
      })
    } catch {
      toast.error('Failed to copy', {
        description: 'Please try again.',
      })
    }
  }

  const keywords = suggestion.keywords || []

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:border-gray-600 transition-all">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge 
                variant="outline" 
                className={`${priorityConfig.className} border text-xs px-2 py-0.5 flex items-center gap-1`}
              >
                {priorityConfig.icon}
                {priorityConfig.label}
              </Badge>
              {isHighPriority && (
                <Badge 
                  variant="outline" 
                  className="bg-amber-950 text-amber-300 border-amber-800 text-xs px-2 py-0.5 flex items-center gap-1"
                >
                  <Star className="w-3 h-3 fill-amber-300" />
                  Top Priority
                </Badge>
              )}
            </div>
            <h3 className="text-gray-100 text-sm font-medium mb-1.5 leading-snug">
              {suggestion.goal}
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              {suggestion.rationale}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 text-gray-500 hover:text-gray-300 flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Alignment Tag */}
        {suggestion.jobRequirement && (
          <div className="p-2 bg-amber-950/30 border-l-2 border-amber-600 rounded-r text-xs">
            <span className="text-amber-300 font-medium">Aligns with: </span>
            <span className="text-amber-400">{suggestion.jobRequirement}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-700 -mx-4 px-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('rewrite')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === 'rewrite'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Rewrite Options
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' ? (
          <div className="space-y-4">
            {/* Quick Edit Tools */}
            {suggestion.quickActions && suggestion.quickActions.length > 0 && 
             (!usedQuickActions || usedQuickActions.length < suggestion.quickActions.length) && (
              <QuickEditTools 
                quickActions={suggestion.quickActions}
                usedActions={usedQuickActions || []}
                onQuickEdit={(actionId) => onQuickEdit && onQuickEdit(suggestion.beforeBulletId, actionId)}
              />
            )}

            {/* Job Comparison - Always visible by default */}
            {suggestion.jobRequirement && keywords.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={() => setShowJobComparison(!showJobComparison)}
                  className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <span className="font-medium">Show Job Comparison</span>
                  {showJobComparison ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
                
                {showJobComparison && (
                  <div className="p-3 bg-gray-900 border border-gray-700 rounded space-y-3">
                    {/* Key Terms */}
                    <div>
                      <div className="text-xs text-gray-400 mb-2">Key terms:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {keywords.map((keyword, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className={`text-xs cursor-pointer transition-colors ${
                              highlightedKeyword && highlightedKeyword.toLowerCase().includes(keyword.toLowerCase())
                                ? 'bg-blue-500/30 border-blue-500 text-blue-300'
                                : 'bg-blue-950/20 border-blue-800 text-blue-400 hover:bg-blue-950/40'
                            }`}
                            onMouseEnter={() => setHighlightedKeyword(keyword)}
                            onMouseLeave={() => setHighlightedKeyword(null)}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Job Requirement */}
                    <div>
                      <div className="text-xs text-gray-400 mb-1.5">Job Requirement:</div>
                      <div className="p-2.5 bg-purple-950/20 border border-purple-800 rounded text-sm text-gray-200">
                        <KeywordHighlighter
                          text={suggestion.jobRequirement}
                          keywords={keywords}
                          highlightedKeyword={highlightedKeyword}
                          onKeywordHover={setHighlightedKeyword}
                        />
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="text-blue-500 text-lg">→</div>
                    </div>

                    {/* Your Resume */}
                    <div>
                      <div className="text-xs text-gray-400 mb-1.5">Your Resume:</div>
                      <div className="p-2.5 bg-blue-950/20 border border-blue-800 rounded text-sm text-gray-200">
                        <KeywordHighlighter
                          text={suggestion.beforeText}
                          keywords={keywords}
                          highlightedKeyword={highlightedKeyword}
                          onKeywordHover={setHighlightedKeyword}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 italic pt-1">
                      Hover over keywords to see matches across both texts
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Before/After Side-by-Side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Current</label>
                <div className="p-2.5 bg-gray-900 border border-gray-700 rounded text-sm text-gray-300 leading-relaxed">
                  {suggestion.beforeText}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <label className="text-xs text-gray-400">Suggested</label>
                  <div className="group relative">
                    <Info className="w-3 h-3 text-gray-500 hover:text-gray-300 cursor-pointer" />
                    <div className="invisible group-hover:visible absolute right-0 top-5 z-10 w-64 p-2.5 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-xs">
                      <div className="text-gray-300 font-medium mb-1">Why this rewrite?</div>
                      <div className="text-gray-400 leading-relaxed">{suggestion.explanation}</div>
                    </div>
                  </div>
                </div>
                <div className="p-2.5 bg-green-950/20 border border-green-800 rounded text-sm text-gray-200 leading-relaxed">
                  {finalRewrite}
                </div>
              </div>
            </div>

            {/* Action/Context/Impact Legend */}
            <div className="flex items-center gap-2 justify-center p-2 bg-gray-900 border border-gray-700 rounded text-xs">
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-green-950/20 text-green-300 border-green-800 text-xs px-1.5 py-0">A</Badge>
                <span className="text-gray-400">Action</span>
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-blue-950/20 text-blue-300 border-blue-800 text-xs px-1.5 py-0">C</Badge>
                <span className="text-gray-400">Context</span>
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-purple-950/20 text-purple-300 border-purple-800 text-xs px-1.5 py-0">I</Badge>
                <span className="text-gray-400">Impact</span>
              </div>
            </div>

            {/* Rewrite Variants */}
            {suggestion.alternatives && suggestion.alternatives.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={() => setShowVariants(!showVariants)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-blue-950/20 border border-blue-800 rounded-md text-sm text-blue-300 hover:bg-blue-950/30 hover:border-blue-700 transition-colors font-medium"
                >
                  <span>Show Rewrite Variants ({suggestion.alternatives.length})</span>
                  {showVariants ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                {showVariants && (
                  <div className="space-y-2">
                    {suggestion.alternatives.map((alt, idx) => (
                      <div
                        key={alt.id}
                        className={`p-3 border rounded transition-all cursor-pointer ${
                          selectedVariant === alt.id
                            ? 'bg-blue-950/30 border-blue-800'
                            : 'bg-gray-800 border-gray-700 hover:border-blue-800'
                        }`}
                        onClick={() => setSelectedVariant(selectedVariant === alt.id ? null : alt.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="group relative">
                              <Lightbulb className="w-4 h-4 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" />
                              <div className="invisible group-hover:visible absolute left-0 top-5 z-10 w-64 p-2.5 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-xs">
                                <div className="text-blue-300 font-medium mb-1">Why this works:</div>
                                <div className="text-gray-400 leading-relaxed">
                                  {alt.label.includes('action-focused')
                                    ? 'This version emphasizes strong action verbs and clear responsibility, making your role and contributions more visible.'
                                    : alt.label.includes('impact-focused')
                                    ? 'This version prioritizes measurable outcomes and quantifiable business impact, demonstrating concrete value.'
                                    : alt.label.includes('JD-aligned')
                                    ? 'This version aligns closely with job description requirements and keywords, improving ATS match and relevance.'
                                    : 'This version provides a different perspective on the same experience.'}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs font-medium text-gray-300">Variant {idx + 2}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                idx === 0 
                                  ? 'bg-blue-950/20 text-blue-300 border-blue-800'
                                  : 'bg-purple-950/20 text-purple-300 border-purple-800'
                              }`}
                            >
                              {alt.label.replace('Alternative ', '').replace('(', '').replace(')', '')}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-gray-300 leading-relaxed">{alt.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Apply Actions */}
            <div className="flex gap-2 pt-2 border-t border-gray-700">
              <Button
                onClick={handleApply}
                size="sm"
                className="flex-1 text-xs bg-green-600 hover:bg-green-500 text-white"
              >
                <Check className="w-3 h-3 mr-1" />
                Apply This Rewrite
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={handleCopy}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
