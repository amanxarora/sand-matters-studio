import React from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: null, label: 'All Sites' },
    { id: 'Suspected Illegal', label: 'Suspected Illegal' },
    { id: 'Confirmed Illegal', label: 'Confirmed Illegal' },
  ];

  return (
    <div className={styles.filterBar}>
      {filters.map(filter => (
        <button
          key={filter.id || 'all'}
          className={`${styles.filterChip} ${activeFilter === filter.id ? styles.active : ''}`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
