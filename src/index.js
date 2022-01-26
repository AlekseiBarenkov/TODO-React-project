import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from '../src/Components/App/App';
import PreviewPage from '../src/Components/PreviewPage/PreviewPage';
import store from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<PreviewPage />}/>
          <Route path='/ToDo' element={<App />}/>
        </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

