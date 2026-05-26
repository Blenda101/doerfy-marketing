'use client'
import Lottie from 'lottie-react'
import animationData from '../../public/animations/Robot Face Loading.json'

interface DoeyAvatarProps {
  size?: number
  className?: string
}

export default function DoeyAvatar({ size = 40, className = '' }: DoeyAvatarProps) {
  return (
    <div style={{ width: size, height: size }} className={`flex-shrink-0 ${className}`}>
      <Lottie animationData={animationData} loop autoplay style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
