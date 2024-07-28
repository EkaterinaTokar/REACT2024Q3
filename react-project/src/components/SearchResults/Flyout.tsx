import React from 'react';
import { useDispatch } from 'react-redux';
import { apiActions } from '../../api/api.slice';
import { AppDispatch } from '../../api/store';
import { SearchResult } from '../../utils/interface';
import { saveAs } from 'file-saver';
import styles from '../SearchResults/Flyout.module.css';

interface FlyoutProps {
  selectedItems: SearchResult[];
}

const Flyout: React.FC<FlyoutProps> = ({ selectedItems }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleUnselectAll = () => {
    dispatch(apiActions.removeAllItems());
  };

  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const headers = ['name, diameter, climate, gravity'];
    const csvRows = selectedItems.map((item) =>
      [item.name, item.diameter, item.climate, item.gravity].join(','),
    );

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, `${selectedItems.length}_planets.csv`);
  };
  return (
    <div className={styles.selectedItems}>
      <p className={styles.text}>
        selected elements:{' '}
        <span className={styles.count}>{selectedItems.length}</span>
      </p>
      <button className={styles.button} onClick={handleUnselectAll}>
        Unselect all
      </button>
      <button className={styles.button} onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default Flyout;
