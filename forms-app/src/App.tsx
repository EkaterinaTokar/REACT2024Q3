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
  console.log(formData);
  return (
    <div>
      <NavBar />
      <Outlet />
      <div>
        {location.pathname === '/' &&
          formData.map((item, index) => (
            <div key={index} className="data">
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
    </div>
  );
}

export default App;
