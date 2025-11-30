import { useState } from 'react'
import { CheckCircle2, Circle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from './ui/badge'

export function SkillsToEvidenceTracker({ skills }) {
  const [expandedSkills, setExpandedSkills] = useState({}) // Track which skills are expanded
  const getStatusConfig = (status) => {
    switch (status) {
      case 'strong':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
          label: 'Well Evidenced',
          badgeClass: 'bg-green-950 text-green-300 border-green-800',
        }
      case 'weak':
        return {
          icon: <Circle className="w-4 h-4 text-yellow-400" />,
          label: 'Needs Strengthening',
          badgeClass: 'bg-yellow-950 text-yellow-300 border-yellow-800',
        }
      case 'missing':
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-400" />,
          label: 'No Evidence',
          badgeClass: 'bg-red-950 text-red-300 border-red-800',
        }
      default:
        return {
          icon: <Circle className="w-4 h-4 text-gray-400" />,
          label: 'Unknown',
          badgeClass: 'bg-gray-800 text-gray-300 border-gray-700',
        }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-medium text-gray-300 mb-3">
          Track which job requirements have supporting evidence in your resume.
        </h3>
      </div>

      {skills.map((skill, idx) => {
        const statusConfig = getStatusConfig(skill.status)
        const bulletCount = skill.bullets.length
        const isExpanded = expandedSkills[idx]
        const hasDetails = skill.jobSource || skill.bullets.length > 0 || skill.gaps.length > 0

        return (
          <div key={idx} className="bg-gray-900 border border-gray-700 rounded-lg">
            {/* Skill Header - Always Visible */}
            <button
              onClick={() => hasDetails && setExpandedSkills(prev => ({ ...prev, [idx]: !prev[idx] }))}
              disabled={!hasDetails}
              className={`w-full p-3 flex items-start justify-between gap-2 transition-colors ${
                hasDetails ? 'hover:bg-gray-800 cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-medium text-gray-200">{skill.skill}</h4>
                  {skill.required && (
                    <Badge variant="outline" className="bg-purple-950 text-purple-300 border-purple-800 text-xs">
                      Required
                    </Badge>
                  )}
                  <Badge variant="outline" className={`${statusConfig.badgeClass} text-xs flex items-center gap-1`}>
                    {statusConfig.icon}
                    {statusConfig.label}
                  </Badge>
                  <span className="text-xs text-gray-500">{bulletCount} {bulletCount === 1 ? 'bullet' : 'bullets'}</span>
                </div>
              </div>
              {hasDetails && (
                <div className="flex-shrink-0 text-gray-400">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              )}
            </button>

            {/* Expandable Details */}
            {isExpanded && hasDetails && (
              <div className="px-3 pb-3 space-y-3 border-t border-gray-700 pt-3">
                {/* Job Description Source */}
                {skill.jobSource && (
                  <div className="p-2 bg-purple-950/20 border border-purple-800 rounded text-xs">
                    <span className="text-purple-300 font-medium">Found in job description: </span>
                    <span className="text-purple-400">"{skill.jobSource}"</span>
                  </div>
                )}

                {/* Supporting Bullets */}
                {skill.bullets.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-400 mb-2 font-medium">
                      Supporting bullets in your resume:
                    </div>
                    <ul className="space-y-1.5">
                      {skill.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gaps */}
                {skill.gaps.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-400 mb-2 font-medium">Gaps to address:</div>
                    <ul className="space-y-1">
                      {skill.gaps.map((gap, gapIdx) => (
                        <li key={gapIdx} className="text-xs text-gray-400 flex items-start gap-2">
                          <span className="text-gray-500 mt-0.5">•</span>
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

