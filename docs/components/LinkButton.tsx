import React from 'react'

interface LinkButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'default' | 'compact'
}

export function LinkButton({ href, children, variant = 'default' }: LinkButtonProps) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: variant === 'compact' ? '6px 12px' : '8px 16px',
    border: '1px solid var(--vocs-color_border)',
    background: 'var(--vocs-color_background)',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    color: 'var(--vocs-color_text)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  }

  const iconStyles = {
    marginLeft: '6px',
    fontSize: '12px',
    transition: 'transform 0.2s ease',
    opacity: 0.7,
  }

  return (
    <a 
      href={href} 
      style={baseStyles}
      onMouseEnter={(e) => {
        const target = e.currentTarget
        target.style.transform = 'translateY(-1px)'
        target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.12)'

        const arrow = target.querySelector('.arrow-icon') as HTMLElement
        if (arrow) {
          arrow.style.transform = 'translateX(2px)'
          arrow.style.opacity = '1'
        }
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget
        target.style.transform = 'translateY(0)'
        target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'

        const arrow = target.querySelector('.arrow-icon') as HTMLElement
        if (arrow) {
          arrow.style.transform = 'translateX(0)'
          arrow.style.opacity = '0.7'
        }
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.1)'
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.12)'
      }}
      onFocus={(e) => {
        const target = e.currentTarget
        const currentShadow = target.style.boxShadow || '0 1px 2px rgba(0, 0, 0, 0.05)'
        target.style.boxShadow = `${currentShadow}, inset 0 0 0 2px rgba(59, 130, 246, 0.5)`
        target.style.outline = 'none'
      }}
      onBlur={(e) => {
        const target = e.currentTarget
        const isHovered = target.matches(':hover')
        target.style.boxShadow = isHovered 
          ? '0 4px 8px rgba(0, 0, 0, 0.12)' 
          : '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}
    >
      <span>{children}</span>
      <span className="arrow-icon" style={iconStyles}>→</span>
    </a>
  )
}

interface LinkButtonGroupProps {
  children: React.ReactNode
}

export function LinkButtonGroup({ children }: LinkButtonGroupProps) {
  const groupStyles = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '12px',
    marginTop: '8px',
    marginBottom: '16px',
  }

  return <div style={groupStyles}>{children}</div>
} 