import { useState } from 'react'
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react'

export function AlignmentStatusBar({ requirements }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const covered = requirements.filter(r => r.status === 'covered').length
  const partial = requirements.filter(r => r.status === 'partial').length
  const missing = requirements.filter(r => r.status === 'missing').length
  const total = requirements.length
  const coveragePercent = Math.round((covered / total) * 100)

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-5 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-gray-300 text-sm font-medium">Requirement Coverage</span>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <span className="text-gray-400">{covered} Covered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Circle className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-gray-400">{partial} Partial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-gray-400">{missing} Missing</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          <span className="text-green-400 font-medium">{coveragePercent}%</span> alignment
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full flex">
          <div 
            className="bg-green-500 h-full transition-all" 
            style={{ width: `${(covered / total) * 100}%` }}
          />
          <div 
            className="bg-yellow-500 h-full transition-all" 
            style={{ width: `${(partial / total) * 100}%` }}
          />
          <div 
            className="bg-red-500 h-full transition-all" 
            style={{ width: `${(missing / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Missing Requirements Alert */}
      {missing > 0 && (
        <div className="mt-3 p-2.5 bg-red-950/20 border border-red-800/40 rounded-md">
          <div className="flex items-start gap-2 mb-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-medium text-red-300">
                {missing} critical {missing === 1 ? 'requirement' : 'requirements'} not yet addressed
              </p>
              <p className="text-xs text-red-400/80 mt-0.5">
                These gaps may significantly impact your application. Consider adding bullets or modifying existing ones.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Expandable Requirements List */}
      <details className="mt-2 group">
        <summary className="text-xs px-3 py-2 bg-blue-950/20 border border-blue-800 rounded-md text-blue-300 cursor-pointer hover:bg-blue-950/30 hover:border-blue-700 transition-colors font-medium flex items-center justify-between list-none">
          <span>View full requirement breakdown</span>
          <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-2 space-y-1.5">
          {/* Missing Requirements First */}
          {requirements.filter(r => r.status === 'missing').map(req => (
            <div key={req.id} className="flex items-start gap-2 text-xs p-2.5 bg-red-950/20 border border-red-800/40 rounded">
              <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-300 font-medium">{req.requirement}</p>
                <p className="text-red-400/80 mt-0.5">No evidence found in current resume</p>
              </div>
            </div>
          ))}
          
          {/* Partial Requirements */}
          {requirements.filter(r => r.status === 'partial').map(req => (
            <div key={req.id} className="flex items-start gap-2 text-xs p-2 bg-gray-900 rounded">
              <Circle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-300">{req.requirement}</p>
                <p className="text-yellow-400 mt-0.5">
                  {req.matchingBullets} {req.matchingBullets === 1 ? 'bullet' : 'bullets'} • Could be strengthened
                </p>
              </div>
            </div>
          ))}
          
          {/* Covered Requirements */}
          {requirements.filter(r => r.status === 'covered').map(req => (
            <div key={req.id} className="flex items-start gap-2 text-xs p-2 bg-gray-900 rounded">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-300">{req.requirement}</p>
                <p className="text-green-400 mt-0.5">
                  {req.matchingBullets} strong {req.matchingBullets === 1 ? 'match' : 'matches'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
