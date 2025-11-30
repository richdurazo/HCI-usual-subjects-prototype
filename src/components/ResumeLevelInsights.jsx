import { TrendingUp, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { Badge } from './ui/badge'

export function ResumeLevelInsights({ insights }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-blue-400'
    if (score >= 40) return 'text-yellow-400'
    return 'text-orange-400'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-950/20 border-green-800'
    if (score >= 60) return 'bg-blue-950/20 border-blue-800'
    if (score >= 40) return 'bg-yellow-950/20 border-yellow-800'
    return 'bg-orange-950/20 border-orange-800'
  }

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className={`p-4 border rounded-lg ${getScoreBg(insights.overallScore)}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Resume Alignment Score</span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <TrendingUp className="w-3 h-3" />
            <span>+{insights.improvementPotential} potential gain</span>
          </div>
        </div>
        <div className={`text-4xl font-bold ${getScoreColor(insights.overallScore)} mb-1`}>
          {insights.overallScore}
          <span className="text-lg text-gray-400">/100</span>
        </div>
      </div>

      {/* Strong Matches */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <h3 className="text-sm font-medium text-gray-200">Strong Matches</h3>
        </div>
        <ul className="space-y-2">
          {insights.strengths.map((strength, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Missing Critical Requirements */}
      {insights.missingCritical.length > 0 && (
        <div className="p-3 bg-red-950/20 border border-red-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-medium text-red-300">Missing Critical Requirements</h3>
          </div>
          <ul className="space-y-1.5">
            {insights.missingCritical.map((item, idx) => (
              <li key={idx} className="text-xs text-red-400 flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Areas to Strengthen */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-yellow-400" />
          <h3 className="text-sm font-medium text-gray-200">Areas to Strengthen</h3>
        </div>
        <ul className="space-y-2">
          {insights.weaknesses.map((weakness, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
              <AlertCircle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>{weakness}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Usage Tip */}
      <div className="p-3 bg-blue-950/20 border border-blue-800 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-medium text-blue-300 mb-1">Usage Tip</div>
            <div className="text-xs text-gray-400">
              Focus on addressing missing critical requirements first, then strengthen areas with partial evidence.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

