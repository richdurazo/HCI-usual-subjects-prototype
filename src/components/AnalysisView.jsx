import { useState, useEffect, useMemo } from 'react'
import { AlignmentStatusBar } from './AlignmentStatusBar'
import { SuggestionsListView } from './SuggestionsListView'
import { Button } from './ui/button'
import { toast } from 'sonner'

export function AnalysisView({ onBack, onDataChange }) {
  const [activeFilter, setActiveFilter] = useState('all')

  // Mock resume bullets (editable) - matches what's being analyzed
  const [resumeBullets, setResumeBullets] = useState([
    {
      id: 'rb1',
      text: 'Built and maintained React + TypeScript dashboards used daily by sales teams.',
      section: 'Experience',
    },
    {
      id: 'rb2',
      text: 'Created automation scripts for reporting.',
      section: 'Experience',
    },
    {
      id: 'rb3',
      text: 'Worked with team to build customer portal.',
      section: 'Experience',
    },
    {
      id: 'rb4',
      text: 'Worked on API development.',
      section: 'Experience',
    },
  ])

  // Base requirement definitions - matches job posting exactly
  const baseRequirements = [
    {
      id: '1',
      requirement: 'Experience with React and modern JavaScript frameworks',
      keywords: ['React', 'JavaScript', 'TypeScript'],
    },
    {
      id: '2',
      requirement: 'Strong understanding of TypeScript and type-safe development',
      keywords: ['TypeScript', 'type-safe', 'types'],
    },
    {
      id: '3',
      requirement: 'Experience with data visualization and dashboard design',
      keywords: ['dashboard', 'visualization', 'data visualization', 'chart'],
    },
    {
      id: '4',
      requirement: 'Track record of delivering measurable business impact',
      keywords: ['impact', 'metric', 'result', 'improve', 'reduce', 'increase', '%'],
    },
    {
      id: '5',
      requirement: 'Experience with GraphQL and REST API integration',
      keywords: ['GraphQL', 'REST', 'API', 'endpoint'],
    },
    {
      id: '6',
      requirement: 'Proficiency in Python for data analysis and automation',
      keywords: ['Python', 'data analysis', 'automation', 'script'],
    },
    {
      id: '7',
      requirement: 'Demonstrated cross-functional collaboration skills',
      keywords: ['cross-functional', 'collaboration', 'team', 'led', 'managed'],
    },
  ]

  // Calculate requirement status dynamically based on current resume bullets
  const requirementStatus = useMemo(() => {
    return baseRequirements.map(req => {
      const allBulletTexts = resumeBullets.map(b => b.text.toLowerCase())
      
      // For Python and GraphQL requirements, require the primary keyword to be present
      const requiresPrimaryKeyword = req.id === '5' || req.id === '6' // GraphQL or Python
      const primaryKeywords = req.id === '5' ? ['graphql'] : req.id === '6' ? ['python'] : []
      
      const matchingBullets = allBulletTexts.filter(bulletText => {
        // If this requirement needs the primary keyword, check for it first
        if (requiresPrimaryKeyword && primaryKeywords.length > 0) {
          const hasPrimaryKeyword = primaryKeywords.some(keyword => 
            bulletText.includes(keyword.toLowerCase())
          )
          if (!hasPrimaryKeyword) {
            return false // Don't count as match if primary keyword is missing
          }
        }
        // Then check if any keyword matches
        return req.keywords.some(keyword => 
          bulletText.includes(keyword.toLowerCase())
        )
      })
      const matchCount = matchingBullets.length

      let status = 'missing'
      if (matchCount >= 2) {
        status = 'covered'
      } else if (matchCount === 1) {
        status = 'partial'
      }

      return {
        id: req.id,
        requirement: req.requirement,
        status,
        matchingBullets: matchCount,
      }
    })
  }, [resumeBullets])

  // Track completed suggestions
  const [completedSuggestions, setCompletedSuggestions] = useState([])
  
  // Track which quick actions have been used for each bullet
  const [usedQuickActions, setUsedQuickActions] = useState({}) // { bulletId: [actionId1, actionId2] }
  
  // Track which bullets are being edited
  const [editingBullets, setEditingBullets] = useState({}) // { bulletId: true }
  const [bulletEditTexts, setBulletEditTexts] = useState({}) // { bulletId: 'text' }
  const [recentlyChangedBullets, setRecentlyChangedBullets] = useState({}) // Track recently changed bullets with timestamps

  // Mock suggestions data - aligned with job requirements
  const [suggestions, setSuggestions] = useState([
    {
      id: '1',
      goal: 'Emphasize measurable outcomes and alignment with React, TypeScript, modern web stack',
      keywords: ['React', 'TypeScript', 'modern web stack'],
      suggestedRewrite: 'Designed and maintained React + TypeScript dashboards in a modern web stack, enabling sales teams to monitor pipeline health and contributing to a 151% increase in qualified opportunities.',
      beforeText: 'Built and maintained React + TypeScript dashboards used daily by sales teams.',
      beforeBulletId: 'rb1',
      alternatives: [
        {
          id: 'alt1',
          label: 'Alternative 1 (action-focused)',
          text: 'Designed and maintained React + TypeScript dashboards in a modern web stack, enabling sales teams to track pipeline health and improving deal visibility by 40%.',
        },
        {
          id: 'alt2',
          label: 'Alternative 2 (JD-aligned)',
          text: 'Owned end-to-end development of React + TypeScript dashboards in a modern web stack, partnering with sales leadership to define metrics and contributing to a 151% increase in qualified opportunities.',
        },
        {
          id: 'alt3',
          label: 'Alternative 3 (impact-focused)',
          text: 'Built and optimized React + TypeScript dashboards in a modern web stack for sales teams, reducing data retrieval time by 50% and contributing to a 151% increase in qualified opportunities.',
        },
      ],
      explanation: 'The suggested version adds clearer context (who used the dashboards and for what) and explicitly states a measurable impact (151% increase in qualified opportunities). It also reinforces key skills from the job description.',
      priority: 'high-impact',
      isTopPriority: true,
      matchStrength: 85,
      matchStrengthLabel: 'Excellent',
      rationale: 'Adding specific metrics and outcomes increases ATS match score by 35% and demonstrates quantifiable value to hiring managers.',
      jobRequirement: 'Experience with React and modern JavaScript frameworks • Track record of delivering measurable business impact',
      quickActions: [
        { id: 'qa1', label: 'Add metric', preview: '...contributing to a 151% increase in qualified opportunities.' },
        { id: 'qa2', label: 'Strengthen verb', preview: 'Designed and maintained...' },
      ],
    },
    {
      id: '2',
      goal: 'Add missing required skill Python, data analysis',
      keywords: ['Python', 'data analysis'],
      suggestedRewrite: 'Developed Python scripts to automate data analysis workflows, reducing manual reporting time by 60% and enabling real-time insights for stakeholders.',
      beforeText: 'Created automation scripts for reporting.',
      beforeBulletId: 'rb2',
      alternatives: [
        {
          id: 'alt1',
          label: 'Alternative 1 (action-focused)',
          text: 'Developed Python scripts using Pandas and NumPy to automate data analysis workflows, processing 10K+ records daily with 99.9% accuracy and reducing manual reporting time by 60%.',
        },
        {
          id: 'alt2',
          label: 'Alternative 2 (JD-aligned)',
          text: 'Built Python automation scripts for data analysis workflows, enabling real-time insights for stakeholders and reducing manual reporting time by 60%, freeing up 20+ hours per week.',
        },
        {
          id: 'alt3',
          label: 'Alternative 3 (impact-focused)',
          text: 'Developed Python scripts to automate data analysis workflows, processing large datasets efficiently and reducing manual reporting time by 60% while enabling real-time insights for stakeholders.',
        },
      ],
      explanation: 'The job posting requires Python proficiency but your resume doesn\'t mention it. This suggestion adds Python while demonstrating relevant impact.',
      priority: 'missing-requirement',
      isTopPriority: true,
      matchStrength: 45,
      matchStrengthLabel: 'Moderate',
      rationale: 'Python is listed as a required skill. Missing required skills reduces ATS match by up to 60%.',
      jobRequirement: 'Proficiency in Python for data analysis and automation',
      quickActions: [
        { id: 'qa1', label: 'Add metric', preview: '...reducing manual reporting time by 60%' },
        { id: 'qa2', label: 'Strengthen verb', preview: 'Developed Python scripts...' },
      ],
    },
    {
      id: '3',
      goal: 'Replace weak verb with action verb Led, managed',
      keywords: ['Led', 'managed'],
      suggestedRewrite: 'Led cross-functional team of 8 engineers to deliver customer portal 3 weeks ahead of schedule, resulting in 95% user satisfaction.',
      beforeText: 'Worked with team to build customer portal.',
      beforeBulletId: 'rb3',
      alternatives: [
        {
          id: 'alt1',
          label: 'Alternative 1 (action-focused)',
          text: 'Led cross-functional team of 8 engineers to deliver customer portal, coordinating with design and engineering teams and resulting in 95% user satisfaction and 40% reduction in support tickets.',
        },
        {
          id: 'alt2',
          label: 'Alternative 2 (JD-aligned)',
          text: 'Led cross-functional team of 8 engineers to deliver customer portal 3 weeks ahead of schedule, improving team velocity and resulting in 95% user satisfaction.',
        },
        {
          id: 'alt3',
          label: 'Alternative 3 (impact-focused)',
          text: 'Led cross-functional team of 8 engineers to deliver customer portal serving 50K+ users, resulting in 95% user satisfaction and 3 weeks ahead of schedule.',
        },
      ],
      explanation: 'Action verbs like "Led" demonstrate ownership and initiative, which aligns with the leadership qualities mentioned in the job description.',
      priority: 'quick-fix',
      isTopPriority: false,
      matchStrength: 65,
      matchStrengthLabel: 'Good',
      rationale: 'Quick improvement: Strong action verbs increase resume impact without changing core content.',
      jobRequirement: 'Demonstrated cross-functional collaboration skills',
      quickActions: [
        { id: 'qa1', label: 'Add metric', preview: '...resulting in 95% user satisfaction' },
        { id: 'qa2', label: 'Strengthen verb', preview: 'Led cross-functional team...' },
      ],
    },
    {
      id: '4',
      goal: 'Match technical skill mentioned in job description',
      keywords: ['GraphQL', 'REST API'],
      suggestedRewrite: 'Built and optimized GraphQL APIs and REST endpoints, reducing API response time by 40% and supporting 2M+ daily requests.',
      beforeText: 'Worked on API development.',
      beforeBulletId: 'rb4',
      alternatives: [
        {
          id: 'alt1',
          label: 'Alternative 1 (action-focused)',
          text: 'Built GraphQL APIs and REST endpoints for customer-facing applications, enabling faster data retrieval and reducing API response time by 40%.',
        },
        {
          id: 'alt2',
          label: 'Alternative 2 (JD-aligned)',
          text: 'Built and optimized GraphQL APIs and REST endpoints, supporting 2M+ daily requests and reducing API response time by 40% for improved user experience.',
        },
        {
          id: 'alt3',
          label: 'Alternative 3 (impact-focused)',
          text: 'Developed GraphQL APIs and REST endpoints with performance optimizations, reducing API response time by 40% and supporting 2M+ daily requests.',
        },
      ],
      explanation: 'GraphQL appears multiple times in the job description but is missing from your resume. This strengthens the match significantly.',
      priority: 'skill-match',
      isTopPriority: false,
      matchStrength: 70,
      matchStrengthLabel: 'Good',
      rationale: 'Keyword match improvement: GraphQL frequency increases from 0x to 2x in your resume.',
      jobRequirement: 'Experience with GraphQL and REST API integration',
      quickActions: [
        { id: 'qa1', label: 'Add metric', preview: '...reducing API response time by 40%' },
        { id: 'qa2', label: 'Insert keyword', preview: '...GraphQL APIs and REST...' },
      ],
    },
  ])

  const handleDismissSuggestion = (id) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
  }

  const handleApplyRewrite = (rewriteText, suggestionId) => {
    const suggestion = suggestions.find(s => s.id === suggestionId)
    if (suggestion && suggestion.beforeBulletId) {
      const bulletId = suggestion.beforeBulletId
      const oldBullet = resumeBullets.find(b => b.id === bulletId)
      
      setResumeBullets(prev => 
        prev.map(bullet => 
          bullet.id === bulletId 
            ? { ...bullet, text: rewriteText }
            : bullet
        )
      )
      
      // Track this bullet as recently changed for visual highlighting
      setRecentlyChangedBullets(prev => ({
        ...prev,
        [bulletId]: Date.now()
      }))
      
      // Move to completed instead of dismissing
      setCompletedSuggestions(prev => [...prev, { ...suggestion, completedAt: Date.now() }])
      handleDismissSuggestion(suggestionId)
      
      toast.success('Rewrite applied!', {
        description: 'The bullet point has been updated in your resume.',
      })
    }
  }

  const handleQuickEdit = (bulletId, actionId) => {
    // Check if action already used
    if (usedQuickActions[bulletId]?.includes(actionId)) {
      return
    }

    // Find suggestion related to this bullet
    const relatedSuggestion = suggestions.find(s => s.beforeBulletId === bulletId)
    if (relatedSuggestion && relatedSuggestion.quickActions) {
      const quickAction = relatedSuggestion.quickActions.find(qa => qa.id === actionId)
      if (quickAction) {
        const bullet = resumeBullets.find(b => b.id === bulletId)
        if (bullet) {
          let newText = bullet.text
          
          // Rewrite entire bullet based on action type
          if (actionId === 'qa1' || actionId.includes('metric')) {
            // Add metric: use the suggested rewrite which includes metrics
            newText = relatedSuggestion.suggestedRewrite
          } else if (actionId === 'qa2' || actionId.includes('verb')) {
            // Strengthen verb: use a variant that emphasizes action verbs
            const actionFocusedVariant = relatedSuggestion.alternatives?.find(
              alt => alt.label.includes('action-focused')
            )
            if (actionFocusedVariant) {
              newText = actionFocusedVariant.text
            } else {
              // Fallback: use suggested rewrite
              newText = relatedSuggestion.suggestedRewrite
            }
          } else {
            // For other actions, use the preview to rewrite
            if (quickAction.preview) {
              // If preview starts with "...", replace the end; otherwise use suggested rewrite
              if (quickAction.preview.startsWith('...')) {
                const baseText = bullet.text.split(',').slice(0, -1).join(',')
                newText = baseText + ', ' + quickAction.preview.replace('...', '')
              } else {
                newText = quickAction.preview
              }
            }
          }

          // Update bullet text
          setResumeBullets(prev => 
            prev.map(b => 
              b.id === bulletId ? { ...b, text: newText } : b
            )
          )

          // Track this bullet as recently changed for visual highlighting
          setRecentlyChangedBullets(prev => ({
            ...prev,
            [bulletId]: Date.now()
          }))

          // Mark action as used
          const updatedUsedActions = [...(usedQuickActions[bulletId] || []), actionId]
          setUsedQuickActions(prev => ({
            ...prev,
            [bulletId]: updatedUsedActions
          }))
          
          // Check if all quick actions have been used
          const allActionsUsed = relatedSuggestion.quickActions.every(qa => 
            updatedUsedActions.includes(qa.id)
          )
          
          if (allActionsUsed) {
            // Move suggestion to completed since all actions are used
            setCompletedSuggestions(prev => [...prev, { ...relatedSuggestion, completedAt: Date.now() }])
            handleDismissSuggestion(relatedSuggestion.id)
            
            toast.success('All quick actions applied!', {
              description: 'The suggestion has been moved to Done.',
            })
          } else {
            toast.success('Quick edit applied!', {
              description: quickAction.label || 'The bullet point has been updated.',
            })
          }
        }
      }
    }
  }

  // Clear old highlights after 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setRecentlyChangedBullets(prev => {
        const updated = {}
        Object.entries(prev).forEach(([bulletId, timestamp]) => {
          if (now - timestamp < 3000) { // Keep highlights for 3 seconds
            updated[bulletId] = timestamp
          }
        })
        return updated
      })
    }, 500) // Check every 500ms

    return () => clearInterval(interval)
  }, [])

  // Update Insights sidebar data whenever resume bullets or requirements change
  // Also run on initial mount to pass initial data
  useEffect(() => {
    if (onDataChange && resumeBullets.length > 0 && requirementStatus.length > 0) {
      // Create new arrays/objects to ensure React detects the change
      // Use JSON parse/stringify to create truly new references
      const newResumeBullets = JSON.parse(JSON.stringify(resumeBullets))
      const newRequirementStatus = JSON.parse(JSON.stringify(requirementStatus))
      onDataChange({
        resumeBullets: newResumeBullets,
        requirementStatus: newRequirementStatus,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeBullets, requirementStatus])

  const filteredSuggestions = activeFilter === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.priority === activeFilter)

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
      {/* Alignment Status Bar */}
      <AlignmentStatusBar requirements={requirementStatus} />

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Panel: Resume Section */}
        <div className="w-1/3 border-r border-gray-700 overflow-y-auto bg-gray-900 min-h-0">
          <div className="p-5">
            <h2 className="text-gray-100 text-sm font-semibold mb-4">Your Resume</h2>
            <div className="space-y-4">
              {resumeBullets.map((bullet) => {
                const relatedSuggestion = suggestions.find(s => s.beforeBulletId === bullet.id)
                const isEditing = editingBullets[bullet.id]
                const editText = bulletEditTexts[bullet.id] || bullet.text
                
                const handleStartEdit = () => {
                  setEditingBullets(prev => ({ ...prev, [bullet.id]: true }))
                  setBulletEditTexts(prev => ({ ...prev, [bullet.id]: bullet.text }))
                }
                
                const handleSaveEdit = () => {
                  const hasChanged = editText !== bullet.text
                  
                  setResumeBullets(prev => 
                    prev.map(b => 
                      b.id === bullet.id ? { ...b, text: editText } : b
                    )
                  )
                  
                  if (hasChanged) {
                    // Track this bullet as recently changed for visual highlighting
                    setRecentlyChangedBullets(prev => ({
                      ...prev,
                      [bullet.id]: Date.now()
                    }))
                    
                    toast.success('Changes saved!', {
                      description: 'The bullet point has been updated.',
                    })
                  }
                  
                  setEditingBullets(prev => {
                    const newState = { ...prev }
                    delete newState[bullet.id]
                    return newState
                  })
                }
                
                const handleCancelEdit = () => {
                  setEditingBullets(prev => {
                    const newState = { ...prev }
                    delete newState[bullet.id]
                    return newState
                  })
                  setBulletEditTexts(prev => {
                    const newState = { ...prev }
                    delete newState[bullet.id]
                    return newState
                  })
                }
                
                const changeTimestamp = recentlyChangedBullets[bullet.id]
                const isRecentlyChanged = !!changeTimestamp
                const timeSinceChange = changeTimestamp ? Date.now() - changeTimestamp : null
                const highlightOpacity = timeSinceChange !== null ? Math.max(0, 1 - (timeSinceChange / 3000)) : 0
                const shouldHighlight = isRecentlyChanged && highlightOpacity > 0
                
                return (
                  <div key={bullet.id} className="space-y-2">
                    <div 
                      className={`p-3 bg-gray-800 border rounded transition-all duration-300 ${
                        shouldHighlight
                          ? 'border-green-500 bg-green-950/20'
                          : 'border-gray-700'
                      }`}
                      style={shouldHighlight ? {
                        boxShadow: `0 0 0 2px rgba(34, 197, 94, ${highlightOpacity * 0.3})`
                      } : {}}
                    >
                      <div className="text-xs text-gray-500 mb-1">{bullet.section}</div>
                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={editText}
                            onChange={(e) => setBulletEditTexts(prev => ({ ...prev, [bullet.id]: e.target.value }))}
                            className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-sm text-gray-200 leading-relaxed resize-none focus:outline-none focus:border-blue-500"
                            rows={3}
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSaveEdit}
                              size="sm"
                              className="text-xs h-7 bg-blue-600 hover:bg-blue-500"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelEdit}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="text-sm text-gray-300 cursor-text hover:bg-gray-700/50 rounded p-1 -m-1 transition-colors"
                          onClick={handleStartEdit}
                          title="Click to edit"
                        >
                          {bullet.text}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Smart Tailoring Recommender */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <SuggestionsListView
            suggestions={filteredSuggestions}
            completedSuggestions={completedSuggestions}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onDismissSuggestion={handleDismissSuggestion}
            onApplyRewrite={handleApplyRewrite}
            onQuickEdit={handleQuickEdit}
            usedQuickActions={usedQuickActions}
          />
        </div>
      </div>
    </div>
  )
}

