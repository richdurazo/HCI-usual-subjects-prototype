import { SuggestionCard } from './SuggestionCard'
import { Button } from './ui/button'
import { TrendingUp, Zap, Target, AlertCircle, CheckCircle2 } from 'lucide-react'

export function SuggestionsListView({
  suggestions,
  completedSuggestions = [],
  activeFilter,
  onFilterChange,
  onDismissSuggestion,
  onApplyRewrite,
  onQuickEdit,
  usedQuickActions = {},
}) {
  const filters = [
    { id: 'all', label: 'All Suggestions' },
    { id: 'high-impact', label: 'High Impact', icon: TrendingUp, color: 'purple' },
    { id: 'skill-match', label: 'Skill Match', icon: Target, color: 'blue' },
    { id: 'quick-fix', label: 'Quick Fix', icon: Zap, color: 'green' },
    { id: 'missing-requirement', label: 'Missing Requirement', icon: AlertCircle, color: 'red' },
  ]

  const getFilterCount = (filterId) => {
    if (filterId === 'all') return suggestions.length
    return suggestions.filter(s => s.priority === filterId).length
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      {/* Filter Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-5 py-3 flex-shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto">
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = activeFilter === filter.id
            
            return (
              <Button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                className={`
                  flex items-center gap-1.5 whitespace-nowrap text-xs
                  ${!isActive && filter.color === 'purple' && 'border-purple-800 text-purple-400 hover:bg-purple-950'}
                  ${!isActive && filter.color === 'blue' && 'border-blue-800 text-blue-400 hover:bg-blue-950'}
                  ${!isActive && filter.color === 'green' && 'border-green-800 text-green-400 hover:bg-green-950'}
                  ${!isActive && filter.color === 'red' && 'border-red-800 text-red-400 hover:bg-red-950'}
                `}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {filter.label}
                {filter.id === 'all' && getFilterCount(filter.id) > 0 && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                    isActive ? 'bg-black/20' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {getFilterCount(filter.id)}
                  </span>
                )}
              </Button>
            )
          })}
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {suggestions.length} {suggestions.length === 1 ? 'suggestion' : 'suggestions'} to optimize your resume
        </p>
      </div>

      {/* Suggestions List */}
      <div className="flex-1 overflow-y-auto p-5 bg-gray-900 min-h-0">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Active Suggestions */}
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onDismiss={() => onDismissSuggestion(suggestion.id)}
                onApplyRewrite={(rewriteText) => onApplyRewrite(rewriteText, suggestion.id)}
                onQuickEdit={onQuickEdit}
                usedQuickActions={usedQuickActions[suggestion.beforeBulletId] || []}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">No suggestions match the current filter</p>
              <Button
                onClick={() => onFilterChange('all')}
                variant="outline"
                size="sm"
                className="mt-4"
              >
                Show all suggestions
              </Button>
            </div>
          )}

          {/* Completed Section */}
          {completedSuggestions.length > 0 && (
            <div className="border-t border-gray-700 pt-6 mt-6">
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">Done ({completedSuggestions.length})</span>
              </div>
              <div className="space-y-4 opacity-60">
                {completedSuggestions.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    onDismiss={() => {}}
                    onApplyRewrite={() => {}}
                    onQuickEdit={() => {}}
                    usedQuickActions={usedQuickActions[suggestion.beforeBulletId] || []}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
