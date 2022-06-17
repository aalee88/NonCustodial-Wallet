import './App.css';
import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';





const App = () => {

  let api = require('etherscan-api').init({ETHERSCAN_API_KEY},'kovan', '3000');

  const [privateKey, setPrivateKey] = useState (null);
  const [balance, setBalance] = useState (null);
  const [walletMnemonic, setWalletMnemonic] = useState ([]);
  const [address, setAddress] = useState (null);
  const [mnemonic, setMnemonic] = useState (null);
  const [wallet, setWallet] = useState (null);
  const [dbalance, setdbalance] = useState (null);
  const [d, setd] = useState (null);
  const [currentNetwork, setCurrentNetwork] = useState ('Ethereum Main Network');
  const [qr, setQr] = useState (null);
  const [tit, setTit] = useState (null);


  const provider = ethers.getDefaultProvider()
  

  


      


  async function loadWallet (event) {
    event.preventDefault();
          let x = localStorage.getItem('wallet-' + event.target.walletname.value);
    console.log('Decrypting')
    

  

       const result = await ethers.Wallet.fromEncryptedJson(x, event.target.Password.value);
        

        setWalletMnemonic(result)
              const p = await result.connect(ethers.getDefaultProvider());
              
              setWallet(p);
              //console.log(wallet);
              setCurrentNetwork ('Ethereum Mainnet Network')
              
              console.log('Changing network to Ethereum Mainnet Network');

              getAddress(event);
              getPersonals(event);
              

        console.log(result)


  }




  async function loadWallet1 (event) {
    event.preventDefault();
    console.log('Decrypting')
    

  

       const result = await ethers.Wallet.fromEncryptedJson(event.target.json.value, event.target.Password.value);
        

        setWalletMnemonic(result)
              const p = await result.connect(ethers.getDefaultProvider());
              
              setWallet(p);
    
              setCurrentNetwork ('Ethereum Mainnet Network')
              console.log('Changing network to Ethereum Mainnet Network');

              getAddress(event);
              getPersonals(event);
              

        console.log(result)

        

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
        try {
          const p = await walletMnemonic.connect(ethers.getDefaultProvider(x));
        
        setWallet(p);
        console.log(wallet);
        setCurrentNetwork (x.charAt(0).toUpperCase() + x.slice(1) + ' Network')
        console.log('Changing network to ' + x + ' Network');
        } catch {
            console.log ('No network with name, "' + x + '"');
        }
  }



      async function open (event) {
        
        event.preventDefault();
      
          const mnemonic = event.target.mnemonic.value;
          const x = ethers.Wallet.fromMnemonic(mnemonic);
          setWalletMnemonic (x);

          

          console.log(x);
         
      }



      async function open2 (event) {
        
        event.preventDefault();
      
      // Create a wallet instance from a private key...
          const priv = event.target.mnemonic.value;
          const x = ethers.Wallet.fromMnemonic(mnemonic);
          setWalletMnemonic (x);

          

          console.log(x);
        
      }



      

      async function addAccount (event) {

        event.preventDefault();


                console.log('encrypting')
                
                const jsons = await wallet.encrypt(event.target.Password.value);

                

                console.log(jsons)

                localStorage.setItem('wallet-' + event.target.walletname.value, jsons);
                console.log('Saved to browser');
            
      }


      

      async function open1 () {
       
    
        const x = await ethers.Wallet.createRandom();
        setWalletMnemonic (x);
        console.log(walletMnemonic);
        console.log(x);
     
        }


      async function provi (x) {

        
        const p = await walletMnemonic.connect(ethers.getDefaultProvider());
        
        setWallet(p);
        setCurrentNetwork ('Ethereum Mainnet Network')
        console.log(p)
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


      async function qrcode () {
        let x = 'https://www.bitcoinqrcodemaker.com/api/?style=ethereum&address=' + address
        setQr(x);
        setTit ("ethereum:" + address)
        console.log (qr)
        console.log(tit)
      }



      useEffect ((event) => {

            if (wallet !== null) {
            price();
            getBalance();
            qrcode();
            }
            
      })




  return (
    <div className="App">

        <h1>Wallet </h1>

       
       <p></p>

      
      <h3>  {currentNetwork} </h3>
      <form onSubmit = {open}>
      <input placeholder= "Mnmeonic" id="mnemonic" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Import Wallet </button>
      </form>
       <p></p>

       <button onClick= {open1} > Create Wallet </button>

       <p></p>

       <button onClick= {provi} > Set Provider </button>

<p></p>


       <form onSubmit = {loadWallet}>
      
        <input placeholder= "Wallet Name" id="walletname" type="text"/><p></p>
        <p></p>
        <input placeholder= "Password" id="Password" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Load Wallet </button>
      </form>
       <p></p>



       <form onSubmit = {loadWallet1}>
      
        <input placeholder= "JSON STRING" id="json" type="text"/><p></p>
        <p></p>
        <input placeholder= "Password" id="Password" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Load Wallet From JSON </button>
      </form>
       <p></p>


       
       

       <form onSubmit = {network}>
      <input placeholder= 'Network name' id="network" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Change Network </button>
      </form>

      <p></p>

      <form onSubmit = {addAccount}>
      <input placeholder= "Wallet Name" id="walletname" type="text"/><p></p>
        <p></p>
      <input placeholder= "Password" id="Password" type="text"/><p></p>
        <p></p>
      <button type={"submit"} >Add Account </button>

       <p></p>
       </form>
                

      <button onClick={getAddress}> GET ADDRESS </button>
      <p> Your Wallet Address: {address} </p>

      <button onClick={qrcode}> GENERATE QR CODE </button> <p></p>
      <a href="https://www.bitcoinqrcodemaker.com"><img src={qr} rel='nofollow'
 height="300" width="300" border="0" alt="Ethereum QR code generator" title={tit} /></a>



      
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

