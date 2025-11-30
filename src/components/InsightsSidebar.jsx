import { useState, useMemo } from 'react'
import { X, BarChart3, Target } from 'lucide-react'
import { Button } from './ui/button'
import { ResumeLevelInsights } from './ResumeLevelInsights'
import { SkillsToEvidenceTracker } from './SkillsToEvidenceTracker'
import { ColorCodeLegend } from './ColorCodeLegend'

export function InsightsSidebar({ isOpen, onClose, resumeBullets = [], requirementStatus = [] }) {
  const [activeTab, setActiveTab] = useState('insights') // 'insights' or 'skills'

  // Calculate insights dynamically based on current resume bullets and requirements
  const insightsData = useMemo(() => {
    // Debug: log when data changes
    console.log('InsightsSidebar recalculating insights:', { 
      resumeBulletsCount: resumeBullets?.length, 
      requirementStatusCount: requirementStatus?.length,
      resumeBullets: resumeBullets,
      requirementStatus: requirementStatus
    })
    // Handle empty data
    if (!requirementStatus || requirementStatus.length === 0 || !resumeBullets || resumeBullets.length === 0) {
      return {
        overallScore: 0,
        improvementPotential: 100,
        strengths: [],
        weaknesses: [],
        topKeywords: [],
        missingCritical: [],
      }
    }

    const covered = requirementStatus.filter(r => r.status === 'covered').length
    const partial = requirementStatus.filter(r => r.status === 'partial').length
    const missing = requirementStatus.filter(r => r.status === 'missing').length
    const total = requirementStatus.length
    const overallScore = total > 0 ? Math.round((covered / total) * 100) : 0
    const improvementPotential = Math.max(0, 100 - overallScore)

    // Count keywords in resume bullets
    const keywordCounts = {}
    resumeBullets.forEach(bullet => {
      const text = bullet.text.toLowerCase()
      const keywords = ['react', 'typescript', 'dashboard', 'team', 'data', 'api', 'graphql', 'python', 'collaboration']
      keywords.forEach(keyword => {
        if (text.includes(keyword)) {
          keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1
        }
      })
    })

    // Check for metrics/impact indicators
    const hasMetrics = resumeBullets.some(b => {
      const text = b.text.toLowerCase()
      return /\d+%/.test(text) || /\d+/.test(text) || text.includes('increase') || text.includes('reduce') || text.includes('improve')
    })

    // Check for strong action verbs
    const strongVerbs = ['built', 'created', 'developed', 'designed', 'led', 'managed', 'optimized', 'delivered']
    const hasStrongVerbs = resumeBullets.some(b => {
      const text = b.text.toLowerCase()
      return strongVerbs.some(verb => text.startsWith(verb))
    })

    // Identify strengths
    const strengths = []
    if (covered >= 2) {
      strengths.push(`Strong technical keyword coverage - matches ${covered} key requirements`)
    }
    if (hasStrongVerbs) {
      strengths.push('Clear action verbs used consistently')
    }
    if (resumeBullets.some(b => b.text.toLowerCase().includes('dashboard'))) {
      strengths.push('Dashboard and data visualization experience mentioned')
    }

    // Identify weaknesses
    const weaknesses = []
    if (!hasMetrics) {
      weaknesses.push('Missing quantifiable metrics in all bullets')
    }
    if (!resumeBullets.some(b => b.text.toLowerCase().includes('graphql'))) {
      weaknesses.push('No mention of GraphQL experience')
    }
    if (!resumeBullets.some(b => b.text.toLowerCase().includes('python'))) {
      weaknesses.push('No mention of Python experience')
    }
    if (resumeBullets.some(b => b.text.toLowerCase().includes('worked with') || b.text.toLowerCase().includes('worked on'))) {
      weaknesses.push('Weak action verbs in some bullets ("Worked with", "Worked on")')
    }

    // Missing critical requirements
    const missingCritical = requirementStatus
      .filter(r => r.status === 'missing')
      .map(r => r.requirement)

    // Top keywords
    const topKeywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([word, frequency]) => ({ word: word.charAt(0).toUpperCase() + word.slice(1), frequency }))

    return {
      overallScore,
      improvementPotential,
      strengths,
      weaknesses,
      topKeywords,
      missingCritical,
    }
  }, [resumeBullets, requirementStatus])

  // Calculate skills data dynamically based on resume bullets and requirements
  const skillsData = useMemo(() => {
    // Debug: log when data changes
    console.log('InsightsSidebar recalculating skills:', { 
      resumeBulletsCount: resumeBullets?.length, 
      requirementStatusCount: requirementStatus?.length 
    })
    // Handle empty data
    if (!resumeBullets || resumeBullets.length === 0 || !requirementStatus || requirementStatus.length === 0) {
      return []
    }

    const skillMappings = [
      {
        skill: 'React & Modern JavaScript',
        keywords: ['react', 'javascript', 'typescript'],
        jobSource: 'Experience with React and modern JavaScript frameworks',
      },
      {
        skill: 'TypeScript',
        keywords: ['typescript', 'type-safe', 'types'],
        jobSource: 'Strong understanding of TypeScript and type-safe development',
      },
      {
        skill: 'Data Visualization & Dashboard Design',
        keywords: ['dashboard', 'visualization', 'data visualization', 'chart'],
        jobSource: 'Experience with data visualization and dashboard design',
      },
      {
        skill: 'GraphQL & API Integration',
        keywords: ['graphql', 'rest', 'api', 'endpoint'],
        jobSource: 'Experience with GraphQL and REST API integration',
      },
      {
        skill: 'Python for Data Analysis',
        keywords: ['python', 'data analysis', 'automation', 'script'],
        jobSource: 'Proficiency in Python for data analysis and automation',
      },
      {
        skill: 'Cross-Functional Collaboration',
        keywords: ['cross-functional', 'collaboration', 'team', 'led', 'managed'],
        jobSource: 'Demonstrated cross-functional collaboration skills',
      },
      {
        skill: 'Measurable Business Impact',
        keywords: ['impact', 'metric', 'result', 'improve', 'reduce', 'increase', '%'],
        jobSource: 'Track record of delivering measurable business impact',
      },
    ]

    return skillMappings.map(skillMapping => {
      const matchingBullets = resumeBullets.filter(bullet => {
        const text = bullet.text.toLowerCase()
        // Check if any keyword matches (case-insensitive)
        return skillMapping.keywords.some(keyword => {
          const keywordLower = keyword.toLowerCase()
          // Handle multi-word keywords like "data analysis"
          if (keywordLower.includes(' ')) {
            return text.includes(keywordLower)
          }
          // For single words, check for whole word or as part of compound words
          return text.includes(keywordLower)
        })
      })

      const matchCount = matchingBullets.length
      
      // Find corresponding requirement to get status
      const requirement = requirementStatus.find(r => 
        r.requirement === skillMapping.jobSource
      )
      
      // Use requirement status if available (more accurate), otherwise calculate from match count
      let status = 'missing'
      if (requirement) {
        // Map requirement status to skill status
        status = requirement.status === 'covered' ? 'strong' : 
                 requirement.status === 'partial' ? 'partial' : 
                 'missing'
      } else {
        // Fallback: calculate from match count
        if (matchCount >= 2) {
          status = 'strong'
        } else if (matchCount === 1) {
          status = 'partial'
        }
      }

      // Determine gaps based on status
      const gaps = []
      if (status === 'missing') {
        gaps.push(`No evidence found in current resume`)
      } else if (status === 'partial') {
        if (matchCount === 1) {
          gaps.push(`Could be strengthened with more specific examples`)
        }
        // Add requirement-specific gaps if available
        if (requirement && requirement.matchingBullets === 1) {
          gaps.push(`Only ${requirement.matchingBullets} bullet matches - consider adding more evidence`)
        }
      }

      return {
        skill: skillMapping.skill,
        required: true,
        status,
        bullets: matchingBullets.map(b => b.text),
        gaps,
        jobSource: skillMapping.jobSource,
      }
    })
  }, [resumeBullets, requirementStatus])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-gray-800 border-l border-gray-700 shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-gray-200 font-medium text-sm">Resume Analysis</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-7 w-7 p-0 text-gray-400 hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm transition-colors ${
              activeTab === 'insights'
                ? 'bg-gray-900 text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm transition-colors ${
              activeTab === 'skills'
                ? 'bg-gray-900 text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Target className="w-4 h-4" />
            Skills Mapping
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'insights' ? (
            <ResumeLevelInsights insights={insightsData} />
          ) : (
            <div className="space-y-4">
              <ColorCodeLegend />
              <SkillsToEvidenceTracker skills={skillsData} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

