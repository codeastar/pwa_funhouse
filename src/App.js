import React from 'react';
import logo from './bitcoin.svg';    //source->https://www.flaticon.com/free-icon/bitcoin-mechanic-symbol_36592
import './App.css';
import { Offline, Online } from "react-detect-offline";
import Btc from './Btc/Btc'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Real Time BTC tracker from blockchain.info
        </p>    
        <div>
          You are <Online>online</Online><Offline>offline</Offline>
       </div>
       <Btc />
      </header>
    </div>
  );
}

export default App;