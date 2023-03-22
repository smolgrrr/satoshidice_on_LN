import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css';
import Game from './component/Game';
import Bits from './component/Bits';
import Secret from './component/Secret';


function App() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous" />
      </head>
      <body>
        <div className='App'>
          <header className='App-header'>
            <Routes>
              <Route path="/" element={<Game />} />
              <Route path="/bits" element={<Bits />} />
              <Route path="/secrets" element={<Secret />} />
            </Routes>
          </header>
        </div>
      </body>
    </html>
  );
}

export default App;
