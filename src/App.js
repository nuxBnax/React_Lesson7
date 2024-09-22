import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import MyButton from './ex2Button';
import FetchButtonEx3 from './FetchButtonEx3';
import ThunkComponent from './ThunkEx4';
import SagaButton from './SagaComp';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'TEST_ACTION' })
  }, [dispatch]);
  return (
    <div className="axample">
      <div>Необходимо открыть консоль чтобы увидеть результат работы</div>
      <MyButton />
      <FetchButtonEx3/>
      <ThunkComponent/>
      <SagaButton/>
    </div>
  );
}

export default App;
