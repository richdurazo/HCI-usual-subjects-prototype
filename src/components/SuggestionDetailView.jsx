import { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { X, Check, Copy } from 'lucide-react'

export function SuggestionDetailView({ suggestion, onBack, onDismiss, onApplyRewrite }) {
  const [selectedVariant, setSelectedVariant] = useState(null)

  if (!suggestion) {
    return (
      <div className="flex-1 overflow-y-auto p-5 bg-gray-900">
        <button onClick={onBack} className="text-blue-400 hover:text-blue-300 text-sm mb-4">
          ← Back to all suggestions
        </button>
        <p className="text-gray-400">No suggestion selected</p>
      </div>
    )
  }

  const finalRewrite = selectedVariant 
    ? suggestion.alternatives?.find(a => a.id === selectedVariant)?.text || suggestion.suggestedRewrite
    : suggestion.suggestedRewrite

  return (
    <div className="flex-1 overflow-y-auto bg-gray-900">
      <div className="max-w-5xl mx-auto p-5">
        {/* Back Button */}
        <button 
          onClick={onBack} 
          className="text-blue-400 hover:text-blue-300 text-sm mb-6 flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Back to all suggestions
        </button>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column: Original Bullet */}
          <div className="space-y-4">
            <div>
              <h2 className="text-gray-100 text-lg font-semibold mb-2">Original Bullet</h2>
              <div className="text-xs text-gray-500 mb-3">Pulled from: Senior Frontend Engineer • SaaS Startup</div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">CURRENT TEXT</label>
                  <div className="p-3 bg-gray-800 border border-gray-700 rounded text-sm text-gray-300">
                    {suggestion.beforeText}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">EDIT BEFORE TRANSLATING (OPTIONAL)</label>
                  <textarea
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-sm text-gray-300 resize-none"
                    rows="3"
                    defaultValue={suggestion.beforeText}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Users can adjust the bullet first if they want. The Translator will use the latest version when generating rewrites.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Guided Rewrite Suggestions */}
          <div className="space-y-4">
            <div>
              <h2 className="text-gray-100 text-lg font-semibold mb-2">Guided Rewrite Suggestions</h2>
              <p className="text-xs text-gray-400 mb-4">Structured help using Action + Context + Impact</p>

              {/* Suggested Rewrite */}
              <div className="mb-4">
                <div className="text-xs font-medium text-gray-400 mb-2">Suggested rewrite</div>
                <div className="p-3 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200 leading-relaxed mb-2">
                  {finalRewrite}
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="outline" className="bg-green-950/20 text-green-300 border-green-800 text-xs">Action</Badge>
                  <Badge variant="outline" className="bg-blue-950/20 text-blue-300 border-blue-800 text-xs">Context</Badge>
                  <Badge variant="outline" className="bg-purple-950/20 text-purple-300 border-purple-800 text-xs">Impact</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onApplyRewrite(finalRewrite)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm"
                  >
                    <Check className="w-4 h-4 mr-1.5" />
                    Apply This Rewrite
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={() => navigator.clipboard.writeText(finalRewrite)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Alternatives */}
              {suggestion.alternatives && suggestion.alternatives.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-medium text-gray-400 mb-2">Alternative Rewrites</div>
                  <div className="space-y-2">
                    {suggestion.alternatives.map((alt) => (
                      <div
                        key={alt.id}
                        className={`p-3 border rounded cursor-pointer transition-colors ${
                          selectedVariant === alt.id
                            ? 'bg-blue-950/30 border-blue-800'
                            : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                        }`}
                        onClick={() => setSelectedVariant(selectedVariant === alt.id ? null : alt.id)}
                      >
                        <div className="text-xs font-medium text-gray-300 mb-1">{alt.label}</div>
                        <div className="text-sm text-gray-300">{alt.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Combined Explanation */}
              <div className="p-3 bg-gray-800 border border-gray-700 rounded">
                <div className="text-xs font-medium text-gray-300 mb-1">Why this rewrite?</div>
                <div className="text-xs text-gray-400">{suggestion.explanation}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
