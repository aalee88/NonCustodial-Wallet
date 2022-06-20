#Self-Custodial Wallet
A fully non custodial wallet created with Javascript and Ethers.JS.


With this you can load your already existing wallet via its mnemonic phrase, private keys, encrypted JSON saved to your browser, JSON string or create a whole new wallet.

After you do so, be sure to connect to the provider by calling the {provi} function.

Your balance loads automatically and its dollar equivalent.


USAGE:

- It checks if the address is real if not it throws an error.
- It also checks if the address ends with '.eth' and then resolves the ENS to an address and sends your transaction over.
- It has a default transaction fee of 0.0000315 Ether.
- Supports Ethereum and Polygon mainnets and other Ethereum test networks.
- To change the network connected to, simply type in the name and click on change network.
- Supports json encryption for better security, saves the json file to both your browser and your device.
- Now supports QR Code for wallet addresses
- Button that redirects to an auto updating link to your address's etherscan page for both mainnet and testnets.
