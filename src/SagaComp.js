import { useDispatch } from "react-redux";
import { fetchUserData } from './actions';

function SagaButton() {
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        dispatch(fetchUserData()); // thunk
    }
    return (
        <button onClick={handleButtonClick}>Нажми для работы с Saga</button>
    );
}

export default SagaButton;