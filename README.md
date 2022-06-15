# Non-Custodial Wallet
A fully non custodial wallet created with Javascript and Ethers.


With this you can load your already existing wallet via its mnemonic phrase or create a whole new wallet.

After you do so, be sure to connect to the provider by calling the {provi} function.

Your balance loads automatically and its dollar equivalent.


For transactions:

- It checks if the address is real if not it throws an error.
- It also checks if the address ends with '.eth' and then resolves the ENS to an address and sends yoyr transaction over.
- It has a default transaction fee of 0.0000315 Ether.
- Supports Ethereum and Polygon mainnets and other Ethereum test networks.
- To change the network connected to, simply type in the name and click on change network.




First update features

- Support for account creation. (not secure in anyway whatsoever. yet)
- Support for login.
- Support for linking an wallet created to a signed in account.
