// App.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contractConfig'; // Import contract ABI and address
import './App.css'; // Import CSS file for styling

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAccount, setUserAccount] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
          setContract(contractInstance);
          const accounts = await web3Instance.eth.getAccounts();
          setUserAccount(accounts[0]);
        } catch (error) {
          console.error('Error connecting to Ethereum:', error);
        }
      } else {
        console.error('Please install MetaMask to use this app');
      }
    };

    initWeb3();
  }, []);

  const handleButtonClick = async () => {
    try {
      // Example: Call a smart contract function
      await contract.methods.someFunction().send({ from: userAccount });
    } catch (error) {
      console.error('Error executing smart contract function:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DRAXLER App</h1>
        <p>User Account: {userAccount}</p>
        <button onClick={handleButtonClick}>Interact with Smart Contract</button>
      </header>
    </div>
  );
}

export default App;
