import './PrizeWheel.css'
import type { Prize } from '../data/prizes'

interface PrizeWheelProps {
  rotation: number
  segments: Prize[]
}

export default function PrizeWheel({ rotation, segments }: Readonly<PrizeWheelProps>) {
  const gradientString = segments
    .map((s, i) => {
      const start = (i / segments.length) * 100
      const end = ((i + 1) / segments.length) * 100
      return `${s.color} ${start}% ${end}%`
    })
    .join(', ')

  const segmentAngle = 360 / segments.length
  const offset = segmentAngle / 2

  return (
    <div className="wheel-container">
      <div className="wheel-marker"></div>
      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          background: `conic-gradient(${gradientString})`,
        }}
      >
        {segments.map((segment, index) => {
          const angle = index * segmentAngle + offset

          return (
            <div
              key={index}
              className="wheel-segment"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <span
                className="segment-text"
                style={{
                  color: segment.textColor,
                  /* FIX: Just counter-rotate to keep upright. Removed translateY! */
                  transform: `rotate(-${angle}deg)`,
                }}
              >
                {segment.label}
              </span>
            </div>
          )
        })}
        <div className="wheel-center" />
      </div>
      <div className="wheel-border-ring" />
    </div>
  )
}
