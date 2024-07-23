import React from 'react';
import { useDispatch } from 'react-redux';
import { apiActions } from '../../api/api.slice';
import { AppDispatch } from '../../api/store';
import { SearchResult } from '../../utils/interface';

interface FlyoutProps {
  selectedItems: SearchResult[];
}

const Flyout: React.FC<FlyoutProps> = ({ selectedItems }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleUnselectAll = () => {
    dispatch(apiActions.removeAllItems());
  };
  const downloadFile = ({
    data,
    fileName,
    fileType,
  }: {
    data: string;
    fileName: string;
    fileType: string;
  }) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const headers = ['name, diameter, climate, gravity'];
    const csvRows = selectedItems.map((item) =>
      [item.name, item.diameter, item.climate, item.gravity].join(','),
    );

    downloadFile({
      data: [headers, ...csvRows].join('\n'),
      fileName: `${selectedItems.length}_selectedPlanets.csv`,
      fileType: 'text/csv',
    });
  };
  return (
    <div /*className={styles.selectedItems}*/>
      <p>number of selected elements: {selectedItems.length}</p>

      {/* <ul>
        {selectedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};
export default Flyout;
