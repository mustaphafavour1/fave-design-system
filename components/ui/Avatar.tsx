import Image from 'next/image'
import { User } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'

export interface AvatarProps {
  src?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  return (
    <span className={clsx('ui-avatar', `ui-avatar-${size}`)}>
      {src ? (
        <Image src={src} alt={name ?? ''} fill sizes="48px" className="ui-avatar-image" />
      ) : name ? (
        <span>{initials(name)}</span>
      ) : (
        <User weight="fill" />
      )}
    </span>
  )
}
