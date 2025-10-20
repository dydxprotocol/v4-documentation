import React, { useState } from 'react';

interface DetailsProps {
  title?: string;
  open?: boolean;
  children: React.ReactNode;
}

/**
 * Details component - A collapsible section with a title
 * 
 * Usage in MDX:
 * <Details title="Unification Plan">
 *   - Content goes here
 *   - More content
 * </Details>
 * 
 * Or with default open state:
 * <Details title="Example" open>
 *   Content that's visible by default
 * </Details>
 */
export function Details({ title, open = false, children }: DetailsProps) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <details className="details-container" open={isOpen}>
      {title && (
        <summary 
          className="details-summary"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          {title}
        </summary>
      )}
      <div className="details-content">
        {children}
      </div>
    </details>
  );
}

// Alternative syntax-friendly version without state management
export function SimpleDetails({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <details className="details-container">
      {title && <summary className="details-summary">{title}</summary>}
      <div className="details-content">
        {children}
      </div>
    </details>
  );
}

// Export as default for easier importing in MDX
export default Details;
