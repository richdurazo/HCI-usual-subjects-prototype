import { Button } from './ui/button';
import { Zap } from 'lucide-react';

export function QuickEditTools({ quickActions, usedActions = [], onQuickEdit }) {
  if (!quickActions || quickActions.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-dashed border-gray-700 rounded-md">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-xs text-gray-400 font-medium">Quick improvements (no full rewrite needed)</span>
      </div>
      
      <div className="flex flex-wrap gap-1.5">
        {quickActions.map(action => {
          const isUsed = usedActions.includes(action.id)
          return (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              onClick={() => !isUsed && onQuickEdit(action.id)}
              disabled={isUsed}
              className={`text-xs h-7 flex items-center gap-1.5 ${
                isUsed
                  ? 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                  : 'border-amber-800/50 bg-amber-950/20 text-amber-300 hover:bg-amber-950/40 hover:border-amber-700'
              }`}
              title={isUsed ? 'Already applied' : (action.preview || action.label)}
            >
              {action.label}
              {isUsed && <span className="ml-1 text-xs">✓</span>}
            </Button>
          )
        })}
      </div>

      <p className="text-xs text-gray-500 mt-2 italic">
        These actions apply targeted fixes to your current bullet
      </p>
    </div>
  );
}

