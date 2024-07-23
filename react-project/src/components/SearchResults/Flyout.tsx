import React from 'react';
import { useDispatch } from 'react-redux';
import { apiActions } from '../../api/api.slice';
import { AppDispatch } from '../../api/store';
import { SearchResult } from '../../utils/interface';
//import { RootState } from '../../api/store';
//import { useSelector } from 'react-redux';

interface FlyoutProps {
  selectedItems: SearchResult[];
}

const Flyout: React.FC<FlyoutProps> = ({ selectedItems }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleUnselectAll = () => {
    dispatch(apiActions.removeAllItems());
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
    </div>
  );
};
export default Flyout;
