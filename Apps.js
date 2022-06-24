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
  const [fromPv, setFromPV] = useState (null); 
  const [view, setView] = useState ('View Details'); 
  const [history, setHistory] = useState ('#'); 
  const [pv, setPv] = useState (''); 
  const [symbol, setSymbol] = useState ('ETH'); 
  const [scan, setScan] = useState ('EtherScan.io');
  const [listAccount, setListAccount] = useState ('View');
  const [del, setDel] = useState (null);
  const [c, setC] = useState (null);

  

  const provider = ethers.getDefaultProvider()
  
  
  const cc = require('cryptocompare')
  cc.setApiKey({CRYPTOCOMPARE_APIKEY})

      

      







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
              //console.log(wallet);
              setCurrentNetwork ('Ethereum Mainnet Network')
              setFromPV(false);
              
              console.log('Changing network to Ethereum Mainnet Network');

              getAddress ();
              setHistory('https://etherscan.io/address/' + address)
              
              

        console.log(result)
        setBJsonMessage ('Successfully Decrypted. Proceed to Wallet below')
        event.target.walletname.value = ''
        event.target.Password.value = ''
        r.style.setProperty('--display', 'none');
        r.style.setProperty('--displays', 'none');
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
              setFromPV(false);
    
              setCurrentNetwork ('Ethereum Mainnet Network')
              console.log('Changing network to Ethereum Mainnet Network');

              getAddress ();
              setHistory('https://etherscan.io/address/' + address)
              
              

        console.log(result)
        setJsonMessage('Successfully Decrypted, Proceed to Wallet below')
        event.target.json.value = ''
        event.target.Password.value = ''
        r.style.setProperty('--display', 'none');
    r.style.setProperty('--displays', 'none');

      } catch(err) {
        setJsonMessage (err.message)
    }

        

  }






  
  

  function price () {

  if (currentNetwork === 'Polygon (Matic) Network') {
        cc.price('MATIC', 'USD')
    .then(prices => {
      console.log(prices.USD)
      setd(prices.USD)
    })
    .catch(console.error)
  } else {
  let c = api.stats.ethprice();

  c.then(function(balanceData){
    console.log(balanceData.result.ethusd);
    setd(balanceData.result.ethusd);
  });
  }
}


  async function network (event) {
        event.preventDefault();
        const x = (event.target.network.value).toLowerCase();
        try {
        if (x !== 'homestead' && x !== 'mainnet' && x !== 'matic') {
          
          const p = await walletMnemonic.connect(ethers.getDefaultProvider(x));
        setNetworkMessage ('Changing network to ' + x.charAt(0).toUpperCase() + x.slice(1) + ' Network')
        
        setWallet(p);
        console.log(wallet);
        setCurrentNetwork (x.charAt(0).toUpperCase() + x.slice(1) + ' Network')
        console.log('Changing network to ' + x + ' Network');
        setNetworkMessage ('Successful!');
        setHistory('https://' + x + '.etherscan.io/address/' + address)
        setScan ('EtherScan.io')
        setSymbol ('ETH')

        } else if (x === 'matic') {
          const p = await walletMnemonic.connect(ethers.getDefaultProvider(x));
          setNetworkMessage ('Changing network to ' + x.charAt(0).toUpperCase() + x.slice(1) + ' Network')
          
          setWallet(p);
          console.log(wallet);
          setCurrentNetwork ('Polygon (' + x.charAt(0).toUpperCase() + x.slice(1) + ') Network')
          console.log('Changing network to ' + x + ' Network');
          setNetworkMessage ('Successful!');
          setHistory('https://polygonscan.com/address/' + address)
          setSymbol ('MATIC')
          setScan('PolygonScan.com')
                

        } else {
          
          const p = await walletMnemonic.connect(ethers.getDefaultProvider());
        setNetworkMessage ('Changing network to ' + x + ' Network')
        
        setWallet(p);
        console.log(wallet);
        setCurrentNetwork ('Ethereum Mainnet Network')
        console.log('Changing network to Ethereum Mainnet Network');
        setNetworkMessage ('Successful!');
        setHistory('https://etherscan.io/address/' + address)
        setSymbol ('ETH')
        setScan('EtherScan.io')
        }
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
          const x = await ethers.Wallet.fromMnemonic(mnemonic).connect(provider);
          setWallet(x);
            setWalletMnemonic (x);
            console.log(x);
            setFromPV(false);
            setErrorMessage ( 'Successfully imported, Proceed to your Wallet below' )
            event.target.mnemonic.value = ''
            r.style.setProperty('--display', 'none');
    r.style.setProperty('--displays', 'none');
          
        } catch(err) {
          console.error ('invalid mnemonic')
          setErrorMessage ( err.message)

        }
          
         
      }



      async function open2 (event) {
        
        event.preventDefault();

        try {
      
      // Create a wallet instance from a private key...
          const priv = event.target.privatekey.value;
          const x = new ethers.Wallet(priv, provider);
          setWalletMnemonic (x);
          setWallet(x);
          setFromPV(true);
          
          getAddress ();
          setHistory('https://etherscan.io/address/' + address)

          console.log(x);
          setPv('Successful! Proceed to the wallet below')
          r.style.setProperty('--display', 'none');
    r.style.setProperty('--displays', 'none');

        } catch(err) {
          console.log (err.message)
          setPv(err.message)
        }
        
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
        const x = await ethers.Wallet.createRandom().connect(provider);
        setWalletMnemonic(x);
        setWallet (x);
        setFromPV(false);
        
        console.log(walletMnemonic);
        console.log(x);
        setCreateMessage ('Wallet successfully created! Proceed to your Wallet below')
        r.style.setProperty('--display', 'none');
    r.style.setProperty('--displays', 'none');
        } catch(err){
          setCreateMessage (err.message)
        }
     
        }



        


    




      async function getAddress () {
        
          const x = await walletMnemonic.address;
          setAddress(x);
          console.log(x);
      }


      async function getPersonals (event) {
        event.preventDefault();
          if (fromPv === false) {
          const x = await walletMnemonic.mnemonic;
          setMnemonic(x.phrase);
          setPrivateKey(await walletMnemonic.privateKey)
          if (view === 'View Details') {
            r.style.setProperty('--displayss', 'block');
            setView ('Hide Details')
          } else {
            r.style.setProperty('--displayss', 'none');
            setView ('View Details')
          }
          console.log(x.phrase);
          console.log(await walletMnemonic.privateKey)

          } else {
          const x = await walletMnemonic.mnemonic;
          setMnemonic(`"NO MNEMONIC DERIVED! {Note that a mnemonic phrase cannot be derived from wallets imported using a private key}"`);
          setPrivateKey(await walletMnemonic.privateKey)
          if (view === 'View Details') {
            r.style.setProperty('--displayss', 'block');
            setView ('Hide Details')
          } else {
            r.style.setProperty('--displayss', 'none');
            setView ('View Details')
          }
          console.log(await walletMnemonic.privateKey)
          }
      }

      

      async function getTx (event) {
            event.preventDefault();

            setTxMessage('Compiling transaction...')

            
            
            let response = await fetch('https://gasstation-mainnet.matic.network/v2')
            let json = await response.json()



            let feeData = await provider.getFeeData();
                console.log(feeData)
                let u = feeData.maxFee
                let q = feeData.maxPriorityFee
                let f = feeData.gasPrice
                console.log(u)
                console.log(q)
                console.log(f)

            

           
            try {


              if (currentNetwork === 'Polygon (Matic) Network') {

                



                if (ethers.utils.isAddress(event.target.recipient.value) == true) {

                  let b = window.confirm('You are about to send ' + event.target.amount.value + ' ' + symbol + ' to ' + event.target.recipient.value + '. The gas price for this transaction is ' + (ethers.utils.parseUnits(
                    `${Math.ceil(json.fast.maxFee)}`,
                    'gwei'
                  )/1000000000) + ' Gwei, Do you wish to proceed?');
                  if (b === true) {
              console.log(json)


                  const tx = {
                    to: event.target.recipient.value,
                    value: ethers.utils.parseEther(event.target.amount.value),
          
                 maxFeePerGas: ethers.utils.parseUnits(
                  `${Math.ceil(json.fast.maxFee)}`,
                  'gwei'
                ),
                maxPriorityFeePerGas: ethers.utils.parseUnits(
                  `${Math.ceil(json.fast.maxPriorityFee)}`,
                  'gwei'
                )
      
                  }
                  setTxMessage ('Processing');
                  const x = await wallet.sendTransaction(tx)
                  setTxMessage ('Pending Confirmation...');
                  await x.wait();
                  setTxMessage ('Successful!' + x);
                  alert('Your transaction of ' + event.target.amount.value + ' ' + symbol + ' to ' + event.target.recipient.value + ' has been completed!')
                  console.log ('Success');
                  console.log (x)
                } else {
                  alert ('This operation has been cancelled')
                }
              } 
                
                else if ((event.target.recipient.value).slice(-4) === '.eth') {

                    let b = window.confirm('You are about to send ' + event.target.amount.value + ' ' + symbol + ' to ' + event.target.recipient.value + '. The gas price for this transaction is ' + (ethers.utils.parseUnits(
                      `${Math.ceil(json.fast.maxFee)}`,
                      'gwei'
                    )/1000000000) + ' Gwei, Do you wish to proceed?');
                    if (b === true) {
                console.log(json)

                      const p = provider.resolveName(event.target.recipient.value);
                      const tx = {
                        to: p,
                        value: ethers.utils.parseEther(event.target.amount.value),
                        maxFeePerGas: ethers.utils.parseUnits(
                          `${Math.ceil(json.fast.maxFee)}`,
                          'gwei'
                        ),
                        maxPriorityFeePerGas: ethers.utils.parseUnits(
                          `${Math.ceil(json.fast.maxPriorityFee)}`,
                          'gwei'
                        )
                      }
                      setTxMessage ('Processing');
                      const x = await wallet.sendTransaction(tx)
                      setTxMessage ('Pending Confirmation...');
                      await x.wait();
                      console.log ('Success');
                      setTxMessage ('Successful!' + x);
                      alert('Your transaction of ' + event.target.amount.value + ' ' + symbol + ' to ' + event.target.recipient.value + ' has been completed!')
                      console.log (x)
                    } else {
                      alert ('This operation has been cancelled')
                    }
                 } else {
                    console.log ('Invalid Address!');
                    setTxMessage ('Invalid Address');
                  }


              } else {


                

                


            if (ethers.utils.isAddress(event.target.recipient.value) == true) {


              let b = window.confirm('You are about to send ' + event.target.amount.value + ' ' + symbol + ' to ' + event.target.recipient.value + '. This transaction will cost a gas price of ' + (ethers.utils.parseUnits(
                `${Math.ceil(f)}`,
                'gwei'
              )/1000000000000000000) + ' Gwei, Do you wish to proceed?');
              
              if (b === true) {


            const tx = {
              to: event.target.recipient.value,
              value: ethers.utils.parseEther(event.target.amount.value),
              maxFeePerGas:  u,
                  maxPriorityFeePerGas: q,
                  gasPrice: f
                 
          

            }
            setTxMessage ('Processing');
            const x = await wallet.sendTransaction(tx)
            setTxMessage ('Pending Confirmation...');
            await x.wait();
            setTxMessage ('Successful!' + x);
            alert('Your transaction of ' + event.target.amount.value + ' ' + symbol + ' to ' + event.target.recipient.value + ' has been completed!')
            console.log ('Success');
            console.log (x)
          } else {
            alert ('This operation has been cancelled')
          }

            } else if ((event.target.recipient.value).slice(-4) === '.eth') {

              let b = window.confirm('You are about to send ' + event.target.amount.value + ' ' + symbol + ' to ' + event.target.recipient.value + '. This transaction will cost a gas price of ' + (ethers.utils.parseUnits(
                `${Math.ceil(f)}`,
                'gwei'
              )/1000000000000000000) + ' Gwei, Do you wish to proceed?');
              
              if (b === true) {

                const p = provider.resolveName(event.target.recipient.value);
                const tx = {
                  to: p,
                  value: ethers.utils.parseEther(event.target.amount.value),
                  maxFeePerGas:  u,
                  maxPriorityFeePerGas:  q,
                  gasPrice: f
                  
                }
                setTxMessage ('Processing');
                const x = await wallet.sendTransaction(tx)
                setTxMessage ('Pending Confirmation...');
                await x.wait();
                console.log ('Success');
                setTxMessage ('Successful!' + x);
                alert('Your transaction of ' + event.target.amount.value + ' ' + symbol + ' to ' + event.target.recipient.value + ' has been completed!')
                console.log (x)
              } else {
                alert ('This operation has been cancelled')
              }
             } else {
              console.log ('Invalid Address!');
              setTxMessage ('Invalid Address');
            }
          }
          }
              catch (err) {
              console.log (err.message);
              setTxMessage (err.message);
            }
          

          event.target.recipient.value = ''
          event.target.amount.value = ''
      }




      async function getBalance () {

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
        setBJsonMessage ('')
        setJsonMessage ('')
        setPv('')
        setDel('')
        setC('')
      }

      function close2 () {
        setWarn('')
      }

      function close1 () {
        setWarn1('')
      }






      useEffect (() => {

            if (wallet !== null) {
            price();
            getBalance();
            generateQrCode();
            getAddress ();
            
            }

            
            
            const timer3 = setTimeout(() =>  setProviderMessage (''), 10000);
            
            const timer6 = setTimeout(() =>  setNetworkMessage(''), 10000);
            
      })






      let r = document.querySelector(':root');




  function show(event) {
    r.style.setProperty('--display', 'block');
    r.style.setProperty('--displays', 'none');
    getAddress ();
    setHistory('https://etherscan.io/address/' + address)
  }

  function shows(event) {
    r.style.setProperty('--display', 'none');
    r.style.setProperty('--displays', 'block');
    getAddress ();
    setHistory('https://etherscan.io/address/' + address)
  }




  



 


 const [th, setTh] = useState ([]);
 const [ti, setTi] = useState ([]);
 const listItems = th.map((ths) => <li key={ths.name}>{ths.name}</li>);

 


  function listAccounts () {
    
    let x = []
    let u = []
    for (let i = 0; i < localStorage.length; i++) {
      u.push(localStorage.key(i).slice(7))
      let p = {}

      p = {
        name: localStorage.key(i).slice(7)
      } 
      
      x.push(p)
    }

    setTh (x)
    setTi (u)


    console.log(th)

    if (listAccount === 'View') {
      setListAccount('Hide')
      r.style.setProperty('--list', 'block');
    } else {
      setListAccount('View')
      r.style.setProperty('--list', 'none');
    }


  }


  function deleteWallet (event) {
    event.preventDefault()
    try {
      listAccounts()
      

    if (ti.includes(event.target.wallet.value) === true) {
      let x = window.confirm ('Are you sure you want to delete the wallet with ID "' + event.target.wallet.value + '"? THIS ACTION IS IRREVESIBLE ONCE CONFIRMED')
    if (x === true) {
      localStorage.removeItem('wallet-' + event.target.wallet.value)
      setDel ('"' + event.target.wallet.value + '" wallet has been deleted!')
      event.target.wallet.value = ''
    } else {
      setDel ('This action was cancelled')
      event.target.wallet.value = ''
    }
  } else {
    setDel ('Wallet named "' + event.target.wallet.value + '" not found.')
  }
  } catch (err) {
    console.log(err.message)
    setDel (err.message)
  }
  }




  function clear (event) {
    event.preventDefault()
    try {
      listAccounts()
      

    if (th.length !== 0) {
      let x = window.confirm ('Are you sure you want to CLEAR ALL WALLETS SAVED TO THIS BROWSER? THIS ACTION IS IRREVESIBLE ONCE CONFIRMED')
    if (x === true) {
      localStorage.clear()
      setC ('All wallets linked to this Browser has been deleted.')
    } else {
      setC ('This action was cancelled')
    }
  } else {
    setC ('No wallet is saved to this browser.')
  }
  } catch (err) {
    console.log(err.message)
    setC (err.message)
  }
  }



  


  
  
 

  
  
    
  
      


     

//<h5 style={{backgroundColor: 'red', color: 'white'}}> Remember to backup your wallet. Go to the settings and either save your wallet as a JSON file or write down the mnemonic phrase or/and private keys before recieving money into it. </h5>

      




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



       <h3> Import wallet using Private Keys</h3>

      <form onSubmit = {open2}>
      <input placeholder= "Private Keys" id="privatekey" type="text"/><p></p>
        <p></p>
               <button type={"submit"} > Import Wallet </button>
      </form>
      <h6> {pv} </h6>
      {pv ? (   
        <button className='button2' onClick={close}> Close </button>
      ) : null}
      
       <p></p>

       
        
       <h3> Importing JSON Wallet from browser </h3>
       <h4> This is for quick login in from the JSON file stored in your browser </h4>
       <h5><p style={{color: 'red', marginTop:"1em"}}>{warn}</p></h5>
      <p></p>
      {warn ? (   
      <button className='button2' onClick={close2} style={{marginBottom:"3em"}}> Close </button>
      ) : null}

      <p></p>

        
      <button onClick={listAccounts}> {listAccount} all saved wallets </button>
      <p></p>
       <li className='list' style={{marginBottom:'3em'}}> {listItems} </li>  
       



       <form onSubmit = {loadWallet}>
        <input style={{marginTop:'1.5em'}} placeholder= "JSON Wallet Name" id="walletname" type="text"/><p></p>
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
        <h6> *Supported Main-Network Names: Mainnet, Matic. <br/> *Supported Test-Network Names: Kovan, Ropsten, Goerli, Rinkeby.</h6>
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
      <h3 style={{marginTop:'3em'}}> WALLET BALANCE</h3>
      <button onClick={getBalance}>Refresh </button>
      <p></p>
      <h3 style={{marginTop:'0em'}}> {balance} {symbol}</h3>
      <h6 style={{marginBottom:'4em'}}>${dbalance}</h6>





      <div className='transaction'>
        <h2> TRANSACTION </h2>

       <p></p>
      <form onSubmit = {getTx}>
      <input placeholder= "Address or ENS ('.eth') name" id="recipient" type="text"/><p></p>
      <input placeholder= "Amount" id="amount" type="text"/><p></p>
        <p></p>
       
                <button type={"submit"} > Send  </button>
      </form>
      <h5> {txMessage}</h5>
      {txMessage ? (   
        <button className='button2' onClick={close}> Close </button>
      ) : null}

      <h3> TRANSACTION HISTORY </h3>
      

      <a href={history} target='_blank'>
        <button> View history on {scan} </button>
        </a>

        <h6> *To view {address}'s tokens and balances on other chains/networks apart <br/> from {currentNetwork} switch over to that chain and click the button below.
      <br/> It will redirect you to that chain's explorer/scan.</h6>


       </div>


      </div>






       

      
       
                

      

     



       <div className='settings'>

        <h2>SETTINGS</h2>
       

       <div className='encrypt'> 
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
      </div>




       <div className='personal'>

      <h3> Mnemonic Phrase and Private Key </h3>
    <p></p>
      <button onClick={getPersonals}> {view} </button>
      <div className='personals'>
      <p> Your mnemonic phrase: <p></p> {mnemonic} </p>
      
      <p> Your Private Keys: <p></p> {privateKey} </p>
      </div>



        <h2 style={{marginTop:"7.5em"}}> DATA MANAGEMENT </h2>
      <div className='delete'>

          <h5> Input the name of the wallet you wish to delete from your browser's storage.</h5>

        <form onSubmit = {deleteWallet}>
        <input placeholder= "Wallet Name" id="wallet" type="text"/><p></p>
          <p></p>
        <button type={"submit"} > Delete Wallet Permanently. </button>

        <p> {del} </p>

        {del ? (   
        <button className='button2' onClick={close}> Close </button>
        ) : null}
        </form>

        <h3> CLEAR ALL ACCOUNT DATA OF BROWSER WALLET FROM YOUR BROWSER </h3>
        <h6> This action is irreversible. </h6>
        <p> <button onClick={clear}> CLEAR ALL DATA </button></p>
        <p> {c} </p>
        {c ? (   
        <button className='button2' onClick={close}> Close </button>
        ) : null}
        </div>






      </div>

       </div>





          
      
       <footer> © 2022 Michael Amadi</footer>
      
    </div>


        



  );
}

export default App;

