import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <PersistGate persistor={persistor} loading={null}>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </PersistGate>
);
