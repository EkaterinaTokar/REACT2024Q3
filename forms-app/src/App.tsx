import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
  const location = useLocation();
  const formData = useSelector(
    (store: RootState) => store.uncontrolledForm.uncontrolledFormData,
  );
  const formHookData = useSelector(
    (store: RootState) => store.reactHookForm.setReactHookFormData,
  );
  return (
    <div>
      <NavBar />
      <Outlet />
      {location.pathname === '/' && (
        <div className="container">
          {formData?.length > 0 &&
            formData.map((item, index) => (
              <div
                key={index}
                className={`data ${item.isNew ? 'new-data' : ''}`}
              >
                <p>Name: {item.name}</p>
                <p>Age: {item.age}</p>
                <p>Email: {item.email}</p>
                <p>Gender: {item.gender}</p>
                {item.picture && (
                  <img
                    src={item.picture}
                    alt="Uploaded"
                    width="100"
                    height="100"
                  />
                )}
                <p>Country: {item.country}</p>
              </div>
            ))}
          {formHookData?.length > 0 &&
            formHookData.map((item, index) => (
              <div
                key={index}
                className={`data ${item.isNew ? 'new-data' : ''}`}
              >
                <p>Name: {item.name}</p>
                <p>Age: {item.age}</p>
                <p>Email: {item.email}</p>
                <p>Gender: {item.gender}</p>
                {item.picture && (
                  <img
                    src={item.picture}
                    alt="Uploaded"
                    width="100"
                    height="100"
                  />
                )}
                <p>Country: {item.country}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
