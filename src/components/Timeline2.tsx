import React from 'react';
import { cn } from '@/lib/utils';

// Types for the timeline component
export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  status?: 'completed' | 'current' | 'upcoming';
  icon?: React.ReactNode;
  content?: React.ReactNode;
  metadata?: Record<string, any>;
}

export interface Timeline2Props {
  items: TimelineItem[];
  variant?: 'default' | 'compact' | 'detailed';
  orientation?: 'vertical' | 'horizontal';
  showConnector?: boolean;
  className?: string;
  itemClassName?: string;
  onItemClick?: (item: TimelineItem) => void;
}

// Individual timeline item component
const TimelineItemComponent: React.FC<{
  item: TimelineItem;
  variant: Timeline2Props['variant'];
  isLast: boolean;
  showConnector: boolean;
  className?: string;
  onClick?: (item: TimelineItem) => void;
}> = ({ item, variant, isLast, showConnector, className, onClick }) => {
  const getStatusStyles = (status?: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return {
          dot: 'bg-green-500 border-green-200',
          connector: 'bg-green-200',
          content: 'opacity-75'
        };
      case 'current':
        return {
          dot: 'bg-blue-500 border-blue-200 ring-4 ring-blue-100',
          connector: 'bg-gray-200',
          content: 'opacity-100'
        };
      case 'upcoming':
        return {
          dot: 'bg-gray-300 border-gray-200',
          connector: 'bg-gray-200',
          content: 'opacity-50'
        };
      default:
        return {
          dot: 'bg-gray-400 border-gray-200',
          connector: 'bg-gray-200',
          content: 'opacity-100'
        };
    }
  };

  const statusStyles = getStatusStyles(item.status);
  const isClickable = onClick !== undefined;

  return (
    <div className={cn('relative flex gap-4', className)}>
      {/* Timeline dot and connector */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200',
            statusStyles.dot,
            isClickable && 'cursor-pointer hover:scale-110'
          )}
          onClick={() => isClickable && onClick(item)}
        >
          {item.icon || (
            <div className="w-2 h-2 bg-white rounded-full" />
          )}
        </div>
        
        {/* Connector line */}
        {showConnector && !isLast && (
          <div className={cn(
            'w-0.5 h-12 mt-2',
            variant === 'compact' ? 'h-8' : 'h-12',
            statusStyles.connector
          )} />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex-1 pb-8 transition-all duration-200',
          statusStyles.content,
          isClickable && 'cursor-pointer hover:bg-gray-50 hover:rounded-lg hover:p-2 hover:ml-2'
        )}
        onClick={() => isClickable && onClick(item)}
      >
        {/* Date */}
        <div className="text-xs text-gray-500 mb-1 font-medium">
          {item.date}
        </div>

        {/* Title */}
        <h3 className={cn(
          'font-semibold text-gray-900 mb-1',
          variant === 'compact' ? 'text-sm' : 'text-base'
        )}>
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className={cn(
            'text-gray-600 mb-3',
            variant === 'compact' ? 'text-xs' : 'text-sm'
          )}>
            {item.description}
          </p>
        )}

        {/* Custom content */}
        {item.content && variant === 'detailed' && (
          <div className="mt-3">
            {item.content}
          </div>
        )}

        {/* Metadata */}
        {item.metadata && variant === 'detailed' && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(item.metadata).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
              >
                <span className="font-medium">{key}:</span>
                <span className="ml-1">{String(value)}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Timeline2 component
export const Timeline2: React.FC<Timeline2Props> = ({
  items,
  variant = 'default',
  orientation = 'vertical',
  showConnector = true,
  className,
  itemClassName,
  onItemClick
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={cn('flex gap-8 overflow-x-auto pb-4', className)}>
        {items.map((item, index) => (
          <div key={item.id} className="flex-shrink-0 min-w-64">
            <TimelineItemComponent
              item={item}
              variant={variant}
              isLast={index === items.length - 1}
              showConnector={false} // Horizontal doesn't use vertical connectors
              className={itemClassName}
              onClick={onItemClick}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-0', className)}>
      {items.map((item, index) => (
        <TimelineItemComponent
          key={item.id}
          item={item}
          variant={variant}
          isLast={index === items.length - 1}
          showConnector={showConnector}
          className={itemClassName}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
};

// Export default
export default Timeline2;

// Utility function to create timeline items easily
export const createTimelineItem = (
  id: string,
  title: string,
  date: string,
  options?: Partial<Omit<TimelineItem, 'id' | 'title' | 'date'>>
): TimelineItem => ({
  id,
  title,
  date,
  ...options
});

// Pre-built timeline variants
export const TimelineVariants = {
  Project: Timeline2,
  Compact: (props: Omit<Timeline2Props, 'variant'>) => (
    <Timeline2 {...props} variant="compact" />
  ),
  Detailed: (props: Omit<Timeline2Props, 'variant'>) => (
    <Timeline2 {...props} variant="detailed" />
  ),
  Horizontal: (props: Omit<Timeline2Props, 'orientation'>) => (
    <Timeline2 {...props} orientation="horizontal" />
  )
};
