import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // импортируем PersistGate
import rootReducer from './rootReducer';
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
// import mySaga from './sagas';
import { persistStore, persistReducer } from 'redux-persist'; // Импортируем persistStore и persistReducer
import storage from 'redux-persist/lib/storage';
import asyncMiddlewareEx3 from './asyncMiddlewareEx3';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import dataReducer from './dataReducer'


//Ex 1
// Это промежуточное ПО для демонстрации дополнительных эффектов.
const middleware = store => next => action => {
  console.log('Дополнительный эффект');

  setTimeout(() => {
    console.log('тайм-ауты, вызовы api и т.д.');
  }, 1000)
  return next(action);
}

// Ex 2
// Это logger middleware , который выводит действия, отправленые в store

const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  return next(action);
}
// Ex Saga
// Создаем middleware для Redux-Saga
const sagaMiddleware = createSagaMiddleware();

// Конфигурация для redux-persist
const persistConfig = {
  key: 'root', // ключ, по которому хранятся состояние в storage
  storage, // Объект storage для хранения
}

// Создаем "персистентный" ред.сер с использованием и persistReducers  и конфигурации
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Настраиваем store  с персистным редьюсером и всеми middleware


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: ['persist/PERSIST'], //  игнорируем действие persist/PERSIST т.к. оно не сериализуемо
    },
  }).concat(middleware, loggerMiddleware, asyncMiddlewareEx3, thunk, sagaMiddleware)
})

// const store = configureStore({
//   reducer: {
//     ...rootReducer,
//     data: dataReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware,
//     loggerMiddleware, asyncMiddlewareEx3, thunk, sagaMiddleware) // указываем через , ex1, ex2 ...
// })
// Запускаем нашу сагу
// sagaMiddleware.run(mySaga);

// инициализируем persistir, который будет использоваться для сохранения/восстановления состояния.
let persistor = persistStore(store);

// оборачиваем наше приложение в PRovider и PersistGate для предоставления store и persistor

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/*Подключаем PersistGate c persistor */}
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


reportWebVitals();
