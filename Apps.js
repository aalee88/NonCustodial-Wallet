import './App.css';
import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import QRCode from 'qrcode';








const App = () => {

  let api = require('etherscan-api').init({ETHERSCAN_APIKEY},'kovan', '3000');

  const [privateKey, setPrivateKey] = useState (null);
  const [balance, setBalance] = useState (null);
  const [walletMnemonic, setWalletMnemonic] = useState ([]);
  const [address, setAddress] = useState (null);
  const [mnemonic, setMnemonic] = useState (null);
  const [wallet, setWallet] = useState (null);
  const [dbalance, setdbalance] = useState (null);
  const [d, setd] = useState (null);
  const [currentNetwork, setCurrentNetwork] = useState ('Ethereum Main Network');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [createMessage, setCreateMessage] = useState("");
  const [providerMessage, setProviderMessage] = useState("");
  const [bjsonMessage, setBJsonMessage] = useState("");
  const [jsonMessage, setJsonMessage] = useState("");
  const [networkMessage, setNetworkMessage] = useState("");
  const [txMessage, setTxMessage] = useState('');
  const [addMessage, setAddMessage] = useState('');
  const [warn, setWarn] = useState('NOTE: IF YOU SAVED A WALLET WITH THE SAME NAME AS AN ALREADY EXISTING ONE ON YOUR BROWSER AND DEVICE, IT OVERWRITES THE CURRENT ONE ON YOUR BROWSER WITH THE NEW ONE SAVED BUT DOESNT DO SO FOR THE ONE ON YOUR DEVICE STORAGE. SO IF YOUR BROWSER JSON WALLET RECOVERY IS BRINGING UP A WRONG WALLET IT MIGHT HAVE BEEN OVERWRITTEN. SIMPLY FIND THE FILE IN YOUR DEVICE STORAGE AND RECOVER THE WALLET USING LOAD WITH JSON STRING INSTEAD')
  const [warn1, setWarn1] = useState('NOTE: IF YOU SAVED A WALLET WITH THE SAME NAME AS AN ALREADY EXISTING ONE ON YOUR BROWSER AND DEVICE, IT OVERWRITES THE CURRENT ONE ON YOUR BROWSER WITH THE NEW ONE SAVED BUT DOESNT DO SO FOR THE ONE ON YOUR DEVICE STORAGE. SO IF YOUR BROWSER JSON WALLET RECOVERY IS BRINGING UP A WRONG WALLET IT MIGHT HAVE BEEN OVERWRITTEN. SIMPLY FIND THE FILE IN YOUR DEVICE STORAGE AND RECOVER THE WALLET USING LOAD WITH JSON STRING INSTEAD')


  const provider = ethers.getDefaultProvider()
 

  async function loadWallet (event) {
    event.preventDefault();
    
    try {
          let x = localStorage.getItem('wallet-' + event.target.walletname.value);
    console.log('Decrypting')
    setBJsonMessage ('Decrypting...')
    
       const result = await ethers.Wallet.fromEncryptedJson(x, event.target.Password.value);
        

        setWalletMnemonic(result)
              const p = await result.connect(ethers.getDefaultProvider());
              
              setWallet(p);
             
              setCurrentNetwork ('Ethereum Mainnet Network')
              
              console.log('Changing network to Ethereum Mainnet Network');

              getAddress(event);
              getPersonals(event);
              

        console.log(result)
        setBJsonMessage ('Successfully Decrypted, Proceed to Wallet below')
        event.target.walletname.value = ''
        event.target.Password.value = ''
    } catch(err) {
        setBJsonMessage (err.message)
    }


  }




  async function loadWallet1 (event) {
    event.preventDefault();
    try {
    console.log('Decrypting')
    setJsonMessage('Decrypting string...')

       const result = await ethers.Wallet.fromEncryptedJson(event.target.json.value, event.target.Password.value);
        

        setWalletMnemonic(result)
              const p = await result.connect(ethers.getDefaultProvider());
              
              setWallet(p);
    
              setCurrentNetwork ('Ethereum Mainnet Network')
              console.log('Changing network to Ethereum Mainnet Network');

              getAddress(event);
              getPersonals(event);
              

        console.log(result)
        setJsonMessage('Successfully Decrypted, Proceed to Wallet below')
        event.target.json.value = ''
        event.target.Password.value = ''

      } catch(err) {
        setJsonMessage (err.message)
    }

        

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
        setNetworkMessage ('Changing network to ' + x + ' Network')
        
        setWallet(p);
        console.log(wallet);
        setCurrentNetwork (x.charAt(0).toUpperCase() + x.slice(1) + ' Network')
        console.log('Changing network to ' + x + ' Network');
        setNetworkMessage ('Successful!');
        event.target.network.value= ''
        } catch (err) {
            console.log (err.message);
            setNetworkMessage (err.message);
        }
  }



      async function open (event) {
        
        event.preventDefault();
          try {
          const mnemonic = event.target.mnemonic.value;
          const x = await ethers.Wallet.fromMnemonic(mnemonic);
            setWalletMnemonic (x);
            console.log(x);
            setErrorMessage ( 'Successfully imported, click the "Provider" button above to set a provider and proceed' )
            event.target.mnemonic.value = ''
          
        } catch(err) {
          console.error ('invalid mnemonic')
          setErrorMessage ( err.message)

        }
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
        try {
              console.log('encrypting')
                setAddMessage ('Encrypting Wallet...')
                
                const jsons = await wallet.encrypt(event.target.Password.value);
                
                console.log(jsons)

                localStorage.setItem('wallet-' + event.target.walletname.value, jsons);
                setAddMessage ('Saved JSON Wallet to Browser')
                console.log('Saved to browser');



                var element = document.createElement("a");
                var file = new Blob(
                  [
                    jsons
                  ],
                  { type: "string/*" }
                );
                element.href = URL.createObjectURL(file);
                element.download = event.target.walletname.value + ".json";
                element.click();
                setAddMessage ('JSON Wallet has been saved to browser and downloaded to device')
                event.target.Password.value= ''
                event.target.walletname.value= ''
        } catch(err) {
              if (err.message === "Cannot read properties of null (reading 'encrypt')")
              setAddMessage('No Wallet added or Provider not set')
        }
            
      }


      

      async function open1 () {
       
        try {
        const x = await ethers.Wallet.createRandom();
        setWalletMnemonic (x);
        console.log(walletMnemonic);
        console.log(x);
        setCreateMessage ('Wallet successfully created! Click on the provider button and proceed to your wallet below')
        } catch {
          setCreateMessage ('An error occured, try again')
        }
     
        }



        


      async function provi (event) {

        try {
        
        const p = await walletMnemonic.connect(ethers.getDefaultProvider());
        
        setWallet(p);
        setCurrentNetwork ('Ethereum Mainnet Network')
        getAddress (event);
        setProviderMessage ('Provider set! Proceed to wallet below')
        console.log(p)
        console.log(wallet);
        } catch {
          setProviderMessage ('Error occured, kindly check your internet connection and create a new wallet or import an one with a mnemonic phrase to set a web3 provider for it.')
        }
        
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
            
            try {
            if (ethers.utils.isAddress(event.target.recipient.value) === true) {
            const tx = {
              to: event.target.recipient.value,
              value: ethers.utils.parseEther(event.target.amount.value)
            }
            setTxMessage ('Processing');
            const x = await wallet.sendTransaction(tx)
            setTxMessage ('Pending Confirmation...');
            await x.wait();
            setTxMessage ('Successful!' + x);
            console.log ('Success');
            console.log (x)
            } else if ((event.target.recipient.value).slice(-4) === '.eth') {
                const p = provider.resolveName(event.target.recipient.value);
                const tx = {
                  to: p,
                  value: ethers.utils.parseEther(event.target.amount.value)
                }
                const x = await wallet.sendTransaction(tx)
                setTxMessage ('Pending');
                await x.wait();
                console.log ('Success');
                setTxMessage ('Successful!' + x);
                console.log (x)
            } else {
              console.log ('Invalid Address!');
              setTxMessage ('Invalid Address');
            }
          }
              catch (err) {
              console.log (err.message);
              setTxMessage (err.message);
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


     






      const generateQrCode = async () => {
        try {
              const response = await QRCode.toDataURL(address);
              setImageUrl(response);
        }catch (error) {
          console.log(error);
        }
      }



      function close () {
        setTxMessage('')
        setAddMessage('')
        setCreateMessage ('')
        setErrorMessage ('')
        setWarn('')
        setBJsonMessage ('')
        setJsonMessage ('')
      }

      function close1 () {
        setWarn1('')
      }






      useEffect (() => {

            if (wallet !== null) {
            price();
            getBalance();
            generateQrCode();
 
            }
  
            const timer3 = setTimeout(() =>  setProviderMessage (''), 10000);
            
            const timer6 = setTimeout(() =>  setNetworkMessage(''), 10000);
            
      })






      let r = document.querySelector(':root');




  function show(event) {
    r.style.setProperty('--display', 'block');
    r.style.setProperty('--displays', 'none');
    getAddress (event);
  }

  function shows(event) {
    r.style.setProperty('--display', 'none');
    r.style.setProperty('--displays', 'block');
    getAddress (event);
  }





      

      

    
  

  
    
  
      


     


      




  return (
    <div className="App">

      <div className='Header'>
        <h1>BROWSER WALLET</h1>
        </div>

       
       


      <div className='onboard'>

        <h2> ONBOARD </h2>


        <button onClick= {open1} > Create Wallet </button>
        <h5> {createMessage} </h5>
        {createMessage ? (   
        <button className='button2' onClick={close}> Close </button>
      ) : null}

        

       <p></p>

       <h3 style={{marginTop:'2.5em'}}> Set a provider after creating a new wallet or importing via mnemonic phrase to connect to the blockchain</h3>
       <button onClick= {provi} > Set Provider </button>
       <h5> {providerMessage}</h5>

<p></p>


<h3> OR </h3>


      


       <h3> Import wallet using 12-Word Mnemonic Phrase</h3>

      <form onSubmit = {open}>
      <input placeholder= "Mnmeonic" id="mnemonic" type="text"/><p></p>
        <p></p>
               <button type={"submit"} > Import Wallet </button>
      </form>
      <h6> {errorMessage} </h6>
      {errorMessage ? (   
        <button className='button2' onClick={close}> Close </button>
      ) : null}
      
       <p></p>

       
        
       <h3> Importing JSON Wallet from browser </h3>
       <h4> This is for quick login in from the JSON file stored in your browser </h4>
       <h5><p style={{color: 'red', marginTop:"1em"}}>{warn}</p></h5>
      <p></p>
      {warn ? (   
      <button className='button2' onClick={close} style={{marginBottom:"3em"}}> Close </button>
      ) : null}
       <form onSubmit = {loadWallet}>
        <input placeholder= "Wallet Name" id="walletname" type="text"/><p></p>
        <p></p>
        <input placeholder= "Password" id="Password" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Load Wallet </button>
      </form>
       <p> <h5> {bjsonMessage} </h5></p>
       {bjsonMessage ? (   
      <button className='button2' onClick={close} style={{marginBottom:"3em"}}> Close </button>
      ) : null}



        
       <h3> Importing wallet with JSON STRING and Password </h3>
       <form onSubmit = {loadWallet1}>
      
        <input placeholder= "JSON STRING" id="json" type="text"/><p></p>
        <p></p>
        <input placeholder= "Password" id="Password" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Load Wallet From JSON STRING</button>
      </form>
       <p><h5> {jsonMessage}</h5></p>
       {jsonMessage ? (   
      <button className='button2' onClick={close} style={{marginBottom:"3em"}}> Close </button>
      ) : null}


       {wallet ? (   
        <div className='button'>

       <button class="button1" onClick={show} > WALLET </button>
        <button class="button1" onClick={shows}> SETTINGS </button>

        </div>
        ) : null}


       </div>





       <div className='wallet'>

        <h2> WALLET </h2>
        <h3> Current Network: {currentNetwork} </h3>
       <form onSubmit = {network}>
      <input placeholder= 'Network name' id="network" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Change Network </button>
      </form>
      <h5> {networkMessage} </h5>
      
      <h3></h3>
      <button onClick={getAddress}> GET ADDRESS </button>
      <p></p>
      <h3 style={{marginTop:'0em'}}> Wallet Address: {address} </h3>
      
      {imageUrl ? (                   
       <img src={imageUrl} alt="img"/>
        ) : null}

    <br/>
        
    {imageUrl ? (   
      <a href={imageUrl} download> <button>  Download QR CODE </button> </a>
      ) : null}


      <p></p>
      <h3 style={{marginTop:'3em'}}> ETHER BALANCE</h3>
      <button onClick={getBalance}>Refresh </button>
      <p></p>
      <h3 style={{marginTop:'0em'}}> {balance} ETH</h3>
      <h6 style={{marginBottom:'4em'}}>${dbalance}</h6>





      <div className='transaction'>
        <h2> TRANSACTION </h2>

       <p></p>
      <form onSubmit = {getTx}>
      <input placeholder= "Recipient" id="recipient" type="text"/><p></p>
      <input placeholder= "Amount" id="amount" type="text"/><p></p>
        <p></p>
                <button type={"submit"} > Send  </button>
      </form>
      <h5> {txMessage}</h5>
      {txMessage ? (   
        <button className='button2' onClick={close}> Close </button>
      ) : null}


       </div>


      </div>



     



       <div className='settings'>

        <h2>SETTINGS</h2>
       

       
        <h3> ENCRYPT WALLET AS JSON </h3>
        <h5> This encrypts your wallet as a JSON file with a password of your choice, 
          <br/> stores it on your browser as the 'Wallet-Name' you chose and downloads the file <br/> 
          into your device's storage as ('Wallet-Name' you chose).JSON
          <p style={{color: 'red', marginTop:"2.5em"}}>{warn1}</p></h5>
          {warn1 ? (   
      <button className='button2' onClick={close1} style={{marginBottom:"3em"}}> Close </button>
      ) : null}
      <p></p>

      <form onSubmit = {addAccount}>
      <input placeholder= "Wallet Name" id="walletname" type="text"/><p></p>
        <p></p>
      <input placeholder= "Password" id="Password" type="text"/><p></p>
        <p></p>
      <button type={"submit"} >Save Wallet JSON </button>


       <p></p>
       </form>

       <h5> {addMessage}</h5>
      {addMessage ? (   
        <button className='button2' onClick={close}> Close </button>
      ) : null}



       <div className='personal'>

      <h3></h3>
    <p></p>
      <button onClick={getPersonals}> Get Mnemonic and Private Key </button>
      <p> Your mnemonic phrase: <p></p>{mnemonic} </p>
      <p> Your Private Keys: <p></p>{privateKey} </p>

      </div>

       </div>

     
      
    </div>


  );
}

export default App;

