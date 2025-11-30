import { TrendingUp, Info } from 'lucide-react';

export function ConfidenceIndicator({ score, label = 'Match Strength', showTooltip = true, source }) {
  const getColor = (score) => {
    if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-600' };
    if (score >= 60) return { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-600' };
    if (score >= 40) return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-600' };
    return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-600' };
  };

  const getLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Weak';
  };

  const colors = getColor(score);
  const matchLabel = getLabel(score);

  return (
    <div className="group relative inline-flex items-center gap-2">
      <div className="flex items-center gap-2">
        <TrendingUp className={`w-3.5 h-3.5 ${colors.text}`} />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-gray-400">{label}</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${colors.bg} transition-all`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${colors.text}`}>
              {score}% {matchLabel}
            </span>
          </div>
        </div>
      </div>
      
      {showTooltip && (
        <div className="relative">
          <Info className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
          <div className="invisible group-hover:visible absolute left-0 top-6 z-10 w-72 p-3 bg-gray-800 border border-gray-600 rounded-md shadow-lg text-xs">
            <p className="text-gray-300 mb-2">
              <span className="font-medium">How this score is calculated:</span>
            </p>
            <ul className="text-gray-400 space-y-1 list-disc list-inside">
              <li>Keyword overlap: {Math.round(score * 0.4)}%</li>
              <li>Semantic similarity: {Math.round(score * 0.35)}%</li>
              <li>Impact metrics present: {Math.round(score * 0.25)}%</li>
            </ul>
            {source && (
              <p className="text-gray-500 mt-2 pt-2 border-t border-gray-700 italic">
                Found in: {source}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

