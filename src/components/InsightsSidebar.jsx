import { useState } from 'react'
import { X, BarChart3, Target } from 'lucide-react'
import { Button } from './ui/button'
import { ResumeLevelInsights } from './ResumeLevelInsights'
import { SkillsToEvidenceTracker } from './SkillsToEvidenceTracker'
import { ColorCodeLegend } from './ColorCodeLegend'

export function InsightsSidebar({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('insights') // 'insights' or 'skills'

  // Mock data - Example showing realistic alignment analysis
  const insightsData = {
    overallScore: 72,
    improvementPotential: 15,
    strengths: [
      'Strong technical keyword coverage (React, TypeScript) - matches 2 key requirements',
      'Clear action verbs used consistently (Built, Created, Worked)',
      'Dashboard and data visualization experience mentioned',
    ],
    weaknesses: [
      'Missing quantifiable metrics in all bullets',
      'No mention of GraphQL or Python experience',
      'Limited details on API development and cross-functional collaboration',
      'Weak action verbs in some bullets ("Worked with", "Worked on")',
    ],
    topKeywords: [
      { word: 'React', frequency: 3 },
      { word: 'TypeScript', frequency: 2 },
      { word: 'Dashboard', frequency: 2 },
      { word: 'Team', frequency: 2 },
      { word: 'Data', frequency: 2 },
      { word: 'API', frequency: 1 },
    ],
    missingCritical: [
      'GraphQL experience (mentioned in Required Skills)',
      'Python proficiency for data analysis and automation',
      'RESTful API integration details',
    ],
  }

  const skillsData = [
    {
      skill: 'React & Modern JavaScript',
      required: true,
      status: 'strong',
      bullets: [
        'Built and maintained React + TypeScript dashboards used daily by sales teams.',
      ],
      gaps: [],
      jobSource: 'Experience with React and modern JavaScript frameworks',
    },
    {
      skill: 'TypeScript',
      required: true,
      status: 'strong',
      bullets: [
        'Built and maintained React + TypeScript dashboards used daily by sales teams.',
      ],
      gaps: ['Could emphasize type-safe patterns or complex type definitions'],
      jobSource: 'Strong understanding of TypeScript and type-safe development',
    },
    {
      skill: 'Data Visualization',
      required: true,
      status: 'partial',
      bullets: [
        'Built and maintained React + TypeScript dashboards used daily by sales teams.',
      ],
      gaps: [
        'No specific charting libraries mentioned (D3, Recharts, Chart.js)',
        'Missing details about what data was visualized',
      ],
      jobSource: 'Experience with data visualization and dashboard design',
    },
    {
      skill: 'GraphQL & API Integration',
      required: true,
      status: 'missing',
      bullets: [],
      gaps: [
        'No mention of GraphQL experience',
        'Limited API integration details (only mentions "Worked on API development")',
      ],
      jobSource: 'Experience with GraphQL and REST API integration',
    },
    {
      skill: 'Python for Data Analysis',
      required: true,
      status: 'missing',
      bullets: [],
      gaps: [
        'No mention of Python',
        'Automation scripts mentioned but language not specified',
      ],
      jobSource: 'Proficiency in Python for data analysis and automation',
    },
    {
      skill: 'Cross-Functional Collaboration',
      required: true,
      status: 'partial',
      bullets: [
        'Worked with team to build customer portal.',
      ],
      gaps: [
        'Could emphasize collaboration with product, design, or other teams',
        'Missing specific examples of cross-functional work',
      ],
      jobSource: 'Demonstrated cross-functional collaboration skills',
    },
    {
      skill: 'Measurable Business Impact',
      required: true,
      status: 'partial',
      bullets: [
        'Built and maintained React + TypeScript dashboards used daily by sales teams.',
      ],
      gaps: [
        'Missing quantifiable metrics or outcomes',
        'No specific business impact mentioned',
      ],
      jobSource: 'Track record of delivering measurable business impact',
    },
  ]

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

