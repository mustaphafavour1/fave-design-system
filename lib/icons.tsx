import type { ComponentType } from 'react'
import {
  Palette,
  Stack,
  PuzzlePiece,
  FlowArrow,
  Package,
  GitBranch,
  Copy,
  Check,
  House,
  User,
  Users,
  ChartBar,
  ChartLine,
  ShieldCheck,
  Lightning,
  Globe,
  Wallet,
  Bell,
  Gear,
  Lock,
  CreditCard,
  ChatCircle,
  DeviceMobile,
  Rocket,
  Sparkle,
  Clock,
  MapPin,
  Envelope,
} from '@phosphor-icons/react/dist/ssr'

// Import from the SSR-safe subpath in any file that might render inside a
// Server Component — the default export of most icon packages calls
// React.createContext at module scope, which crashes Next's server-side
// page-data collection with an opaque "createContext is not a function".
export const iconMap: Record<string, ComponentType<any>> = {
  Palette,
  Stack,
  PuzzlePiece,
  FlowArrow,
  Package,
  GitBranch,
  Copy,
  Check,
  House,
  User,
  Users,
  ChartBar,
  ChartLine,
  ShieldCheck,
  Lightning,
  Globe,
  Wallet,
  Bell,
  Gear,
  Lock,
  CreditCard,
  ChatCircle,
  DeviceMobile,
  Rocket,
  Sparkle,
  Clock,
  MapPin,
  Envelope,
}

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'

export function ResolvedIcon({
  name,
  size = 20,
  weight = 'regular',
  color,
  className,
}: {
  name: string
  size?: number
  weight?: IconWeight
  color?: string
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon size={size} weight={weight} color={color} className={className} /> : null
}
