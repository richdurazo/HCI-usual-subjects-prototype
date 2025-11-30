import { CheckCircle2, Circle, AlertCircle } from 'lucide-react'

export function ColorCodeLegend() {
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
      <h3 className="text-xs font-medium text-gray-300 mb-3">Evidence Status Guide</h3>
      <div className="space-y-2.5">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-medium text-gray-200">Well Evidenced</div>
            <div className="text-xs text-gray-400">Multiple strong bullets support this requirement.</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Circle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-medium text-gray-200">Needs Strengthening</div>
            <div className="text-xs text-gray-400">Some evidence exists but could be improved.</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-medium text-gray-200">No Evidence</div>
            <div className="text-xs text-gray-400">Missing from resume - critical gap to address.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

