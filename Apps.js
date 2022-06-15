import './App.css';
import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';


const App = () => {

  let api = require('etherscan-api').init({ETHERSCAN_API},'kovan', '3000');

  const [privateKey, setPrivateKey] = useState (null);
  const [balance, setBalance] = useState (null);
  const [walletMnemonic, setWalletMnemonic] = useState ([]);
  const [address, setAddress] = useState (null);
  const [mnemonic, setMnemonic] = useState (null);
  const [wallet, setWallet] = useState (null);
  const [dbalance, setdbalance] = useState (null);
  const [d, setd] = useState (null);
  const [currentNetwork, setCurrentNetwork] = useState ('Ethereum Main Network');
  const [currentId, setCurrentId] = useState (null);
  const [accounts, setAccounts] = useState ([]);
  const [provider, setProvider] = useState ()







  function createAccount (event) {
    event.preventDefault();
    let x = {
      email: event.target.email.value,
      password: event.target.password.value,
      id: accounts.length,
      account: []
    }
    accounts.push(x);
    

    console.log (accounts);
  }



  function login (event) {
    event.preventDefault();

    if (currentId === null) {
    if (event.target.password.value === accounts[event.target.id.value].password) {
        setCurrentId(accounts[event.target.id.value].id);
        console.log(currentId)
        console.log (accounts[event.target.id.value]);
        
    } else {
      console.log ('Invalid details!');
    }
  } else {
    console.log ('logout first!')
  } 
  }



  function logout (event) {
    event.preventDefault();

    if (currentId !== null) {
    setCurrentId(null)
    setAddress(null)
    setWallet(null)
    setMnemonic(null)
    setPrivateKey(null)
    setWalletMnemonic(null)
    setdbalance(null)
    setBalance(null)
    setCurrentNetwork('Ethereum Main Network')
    
  } else {
    console.log ('you are not logged in!')
  }
    
  }


  function loadWallet (event) {
    event.preventDefault();
        let x = accounts[currentId].account[event.target.walletId.value]
        
        setWalletMnemonic(x)
        console.log(wallet)

  }
  

  function price () {
  let c = api.stats.ethprice();

  c.then(function(balanceData){
    console.log(balanceData.result.ethusd);
    setd(balanceData.result.ethusd);
  });
}


  async function network (event) {
        event.preventDefault();
        const x = (event.target.network.value).toLowerCase();
        try {const p = await walletMnemonic.connect(ethers.getDefaultProvider(x));
        
        setWallet(p);
        console.log(wallet);
        setCurrentNetwork (x.charAt(0).toUpperCase() + x.slice(1) + ' Network')
        console.log('Changing network to ' + currentNetwork);
        } catch {
            console.log ('No network with name, "' + x + '"');
        }
  }



      async function open (event) {
        
        event.preventDefault();
        if (currentId !== null) {
      // Create a wallet instance from a mnemonic...
          const mnemonic = event.target.mnemonic.value;
          const x = ethers.Wallet.fromMnemonic(mnemonic);
          setWalletMnemonic (x);

          

          console.log(x);
          } else {
            console.log ('sign in first')
        }
      }



      async function addAccount () {
        
          let i = 0;

        if (accounts[currentId].account.length > 0 && accounts[currentId].account.includes(wallet) === false) { 
          

              if (wallet === null) {
                console.log ('No account logged in');
              } else if (wallet !== null) {
                accounts[currentId].account.push(wallet);
                console.log('Added');
              }
           

        } else if (accounts.length > 0 && accounts.includes(wallet) === true) { 
                console.log ('Account already added');

         } else if (accounts[currentId].account.length === 0) {
              if (wallet === null) {
                console.log ('No account logged in');
              } else if (wallet !== null) {
                accounts[currentId].account.push(wallet);

                console.log('Added');
              }
        }
      }


      

      async function open1 () {
        if (currentId !== null) {
    
        const x = await ethers.Wallet.createRandom();
        setWalletMnemonic (x);
        console.log(walletMnemonic);
        console.log(x);
      } else {
        console.log ('sign in first')
      }
        }


      async function provi (x) {

        
        const p = await walletMnemonic.connect(ethers.getDefaultProvider());
        
        setWallet(p);
        setCurrentNetwork ('Ethereum Mainnet Network')
        console.log(wallet);
        
      }





      async function getAddress (event) {
        event.preventDefault();
          const x = await walletMnemonic.address;
          setAddress(x);
          console.log(x);
      }


      async function getPersonals (event) {
        event.preventDefault();
          const x = await walletMnemonic.mnemonic;
          setMnemonic(x.phrase);
          setPrivateKey(await walletMnemonic.privateKey)
          console.log(x.phrase);
          console.log(await walletMnemonic.privateKey)
      }

      

      async function getTx (event) {
            event.preventDefault();
            if (ethers.utils.isAddress(event.target.recipient.value) === true) {
            const tx = {
              to: event.target.recipient.value,
              value: ethers.utils.parseEther(event.target.amount.value)
            }
            const x = await wallet.sendTransaction(tx)
            await x.wait();
            console.log ('Success');
            console.log (x)
            } else if ((event.target.recipient.value).slice(-4) === '.eth') {
                const p = provider.resolveName(event.target.recipient.value);
                const tx = {
                  to: p,
                  value: ethers.utils.parseEther(event.target.amount.value)
                }
                const x = await wallet.sendTransaction(tx)
                await x.wait();
                console.log ('Success');
                console.log (x)
            }
              else {
              console.log ('Invalid Address!');
            }
      }




      async function getBalance (event) {

          let x = await wallet.getBalance();
          let a = balance * d;

          setBalance((ethers.utils.formatEther(x)));
          setdbalance(a);
          
          
          console.log(ethers.utils.formatEther(x));
            
          
          console.log(dbalance);
      }



      useEffect (() => {

            if (wallet !== null) {
            
            price();
            getBalance();
            }
            
      })




  return (
    <div className="App">

        <h1>Wallet </h1>

        <p> {currentId} </p>

        <button onClick= {logout} > Log OUT </button>

      <form onSubmit = {createAccount}>
      <input placeholder= "email" id="email" type="text"/><p></p>
        <p></p>
        <input placeholder= "password" id="password" type="text"/><p></p>
        
                <button type={"submit"} > Create Account </button>
      </form>
       <p></p>

       <form onSubmit = {login}>
      <input placeholder= "ID" id="id" type="text"/><p></p>
        <p></p>
        <input placeholder= "password" id="password" type="text"/><p></p>
                <button type={"submit"} > Login </button>
      </form>
       <p></p>

      
      <h3>  {currentNetwork} </h3>
      <form onSubmit = {open}>
      <input placeholder= "Mnmeonic" id="mnemonic" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Open </button>
      </form>
       <p></p>





       <button onClick= {open1} > Open1 </button>

       <p></p>


       <form onSubmit = {loadWallet}>
      <input placeholder= "Wallet ID" id="walletId" type="number"/><p></p>
        <p></p>
                <button type={"submit"} > Load Wallet </button>
      </form>
       <p></p>



       <button onClick= {provi} > Set Provider </button>

       <p></p>

       <form onSubmit = {network}>
      <input placeholder= 'Network name' id="network" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Change Network </button>
      </form>

      <p></p>


       <button onClick= {addAccount} >Add Account </button>

       <p></p>
                

      <button onClick={getAddress}> GET ADDRESS </button>
      <p> Your Wallet Address: {address} </p>

    <p></p>
      <button onClick={getPersonals}> GET Personals </button>
      <p> Your mnemonic phrase: <p></p>{mnemonic} </p>
      <p> Your Private Keys: <p></p>{privateKey} </p>

      <p></p>
      <form onSubmit = {getTx}>
      <input placeholder= "recipient" id="recipient" type="text"/><p></p>
      <input placeholder= "amount" id="amount" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > send </button>
      </form>
<p></p>
      <button onClick={getBalance}> Balance </button>
      <p></p>
      <h3>Ether Balance: {balance} ETH</h3>
      <p></p>
      <h3>Dollar Balance: ${dbalance}</h3>
      
    </div>


  );
}

export default App;
