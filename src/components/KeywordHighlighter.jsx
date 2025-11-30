export function KeywordHighlighter({ text, keywords, highlightedKeyword, onKeywordHover }) {
  if (!keywords || keywords.length === 0 || !text) {
    return <span>{text}</span>
  }

  // Sort keywords by length (longest first) to match longer phrases first
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length)
  
  // Create a regex pattern that matches keywords (case-insensitive)
  // Escape special regex characters and use word boundaries for single words
  const pattern = new RegExp(
    sortedKeywords
      .map(keyword => {
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        // Use word boundaries for single words, but not for phrases
        return keyword.includes(' ') ? escaped : `\\b${escaped}\\b`
      })
      .join('|'),
    'gi'
  )

  const parts = []
  let lastIndex = 0
  let match
  const matches = []

  // Find all matches
  while ((match = pattern.exec(text)) !== null) {
    matches.push({
      index: match.index,
      text: match[0],
      length: match[0].length,
    })
  }

  // Build parts array
  matches.forEach((match) => {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({
        text: text.substring(lastIndex, match.index),
        isKeyword: false,
      })
    }

    // Add the matched keyword
    const matchedText = match.text
    const matchingKeyword = sortedKeywords.find(k => 
      matchedText.toLowerCase().includes(k.toLowerCase())
    )
    const isHighlighted = highlightedKeyword && matchingKeyword &&
      (matchedText.toLowerCase().includes(highlightedKeyword.toLowerCase()) ||
       highlightedKeyword.toLowerCase().includes(matchingKeyword.toLowerCase()))
    
    parts.push({
      text: matchedText,
      isKeyword: true,
      isHighlighted,
      keyword: matchingKeyword,
    })

    lastIndex = match.index + match.length
  })

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      isKeyword: false,
    })
  }

  // If no matches found, return original text
  if (parts.length === 0 || (parts.length === 1 && !parts[0].isKeyword)) {
    return <span>{text}</span>
  }

  return (
    <span>
      {parts.map((part, index) => {
        if (part.isKeyword) {
          return (
            <span
              key={index}
              className={`cursor-pointer transition-colors ${
                part.isHighlighted
                  ? 'bg-blue-500/30 text-blue-300 font-medium'
                  : 'text-blue-400 hover:bg-blue-500/20'
              }`}
              onMouseEnter={() => onKeywordHover && onKeywordHover(part.keyword || part.text)}
              onMouseLeave={() => onKeywordHover && onKeywordHover(null)}
            >
              {part.text}
            </span>
          )
        }
        return <span key={index}>{part.text}</span>
      })}
    </span>
  )
}

