import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from '../src/Components/App/App';
import PreviewPage from '../src/Components/PreviewPage/PreviewPage';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<PreviewPage />}/>
        <Route path='/ToDo' element={<App />}/> 
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

