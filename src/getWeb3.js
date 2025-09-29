import { Web3 } from "web3";

const API_KEY = process.env["REACT_APP_PROXY_MULTISENDER_XSCAN_API_KEY"];
const API_V2_BASE_URL = "https://api.etherscan.io/v2/api";

const getAccounts = () => {
  return new Promise(function (resolve, reject) {
    (async () => {
      try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        const { ethereum } = window;
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        resolve(accounts);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })();
  });
};

let _web3Config = null;
let _web3Promise = null;
let getWeb3 = () => {
  if (!_web3Promise) {
    _web3Promise = new Promise(function (resolve, reject) {
      if (null !== _web3Config) {
        resolve(_web3Config);
        return;
      }
      // Wait for loading completion to avoid race conditions with ethereum injection timing.
      window.addEventListener("load", function () {
        // Checking if ethereum has been injected by the browser (Mist/MetaMask)
        if (window.hasOwnProperty("ethereum")) {
          // Use Mist/MetaMask's provider.
          let web3 = new Web3(window.ethereum);
          web3.eth.net
            .getId()
            .then((netId) => {
              let netIdName,
                trustApiName,
                explorerUrl,
                explorerAPIUrl,
                gasPriceAPIUrl,
                currencyTicker,
                currencyTickerName,
                blockchainName;
              netId = netId.toString();
              console.log("netId", netId);
              switch (netId) {
                case "1": // Ethereum Mainnet
                  netIdName = "Mainnet";
                  trustApiName = "api";
                  explorerUrl = "https://etherscan.io";
                  explorerAPIUrl = `${API_V2_BASE_URL}?chainid=1&module=account&action=tokentx&address=%1$s&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}`;
                  gasPriceAPIUrl = `${API_V2_BASE_URL}?chainid=1&module=gastracker&action=gasoracle&apikey=${API_KEY}`;
                  currencyTicker = "ETH";
                  currencyTickerName = "Ether";
                  blockchainName = "Ethereum";
                  console.log("This is Foundation", netId);
                  break;

                case "11155111": // Sepolia
                  netIdName = "Sepolia";
                  trustApiName = "sepolia";
                  explorerUrl = "https://sepolia.etherscan.io";
                  explorerAPIUrl = `${API_V2_BASE_URL}?chainid=11155111&module=account&action=tokentx&address=%1$s&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}`;
                  gasPriceAPIUrl = `${API_V2_BASE_URL}?chainid=11155111&module=gastracker&action=gasoracle&apikey=${API_KEY}`;
                  currencyTicker = "ETH";
                  currencyTickerName = "Ether";
                  blockchainName = "Ethereum Sepolia Testnet";
                  console.log("This is Sepolia", netId);
                  break;

                case "17000": // Holesky
                  netIdName = "Holesky";
                  trustApiName = "holesky";
                  explorerUrl = "https://holesky.etherscan.io";
                  explorerAPIUrl = `${API_V2_BASE_URL}?chainid=17000&module=account&action=tokentx&address=%1$s&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}`;
                  gasPriceAPIUrl = `${API_V2_BASE_URL}?chainid=17000&module=gastracker&action=gasoracle&apikey=${API_KEY}`;
                  currencyTicker = "ETH";
                  currencyTickerName = "Ether";
                  blockchainName = "Ethereum Holesky Testnet";
                  console.log("This is Holesky", netId);
                  break;

                case "56": // BSC Mainnet
                  netIdName = "BSC";
                  trustApiName = "bsc";
                  explorerUrl = "https://bscscan.com";
                  explorerAPIUrl = `${API_V2_BASE_URL}?chainid=56&module=account&action=tokentx&address=%1$s&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}`;
                  gasPriceAPIUrl = `${API_V2_BASE_URL}?chainid=56&module=gastracker&action=gasoracle&apikey=${API_KEY}`;
                  currencyTicker = "BNB";
                  currencyTickerName = "BNB";
                  blockchainName = "Binance Smart Chain";
                  console.log("This is Binance Smart Chain", netId);
                  break;

                case "97": // BSC Testnet
                  netIdName = "BSCTest";
                  trustApiName = "bsctest";
                  explorerUrl = "https://testnet.bscscan.com";
                  explorerAPIUrl = `${API_V2_BASE_URL}?chainid=97&module=account&action=tokentx&address=%1$s&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}`;
                  gasPriceAPIUrl = `${API_V2_BASE_URL}?chainid=97&module=gastracker&action=gasoracle&apikey=${API_KEY}`;
                  currencyTicker = "BNB";
                  currencyTickerName = "BNB";
                  blockchainName = "Binance Smart Chain Test";
                  console.log("This is Binance Smart Chain Test", netId);
                  break;

                case "137": // Polygon Mainnet
                  netIdName = "Polygon";
                  trustApiName = "polygon";
                  explorerUrl = "https://polygonscan.com";
                  explorerAPIUrl = `${API_V2_BASE_URL}?chainid=137&module=account&action=tokentx&address=%1$s&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}`;
                  gasPriceAPIUrl = `${API_V2_BASE_URL}?chainid=137&module=gastracker&action=gasoracle&apikey=${API_KEY}`;
                  currencyTicker = "MATIC";
                  currencyTickerName = "MATIC";
                  blockchainName = "Polygon";
                  console.log("This is Polygon", netId);
                  break;

                case "80002": // Polygon Amoy Testnet
                  netIdName = "Amoy";
                  trustApiName = "polygon";
                  explorerUrl = "https://amoy.polygonscan.com";
                  explorerAPIUrl = `${API_V2_BASE_URL}?chainid=80002&module=account&action=tokentx&address=%1$s&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}`;
                  gasPriceAPIUrl = `${API_V2_BASE_URL}?chainid=80002&module=gastracker&action=gasoracle&apikey=${API_KEY}`;
                  currencyTicker = "MATIC";
                  currencyTickerName = "MATIC";
                  blockchainName = "Polygon Amoy";
                  console.log("This is Polygon Amoy Testnet", netId);
                  break;

                default:
                  netIdName = "Unknown";
                  console.log("This is an unknown network.", netId);
              }
              document.title = `${netIdName} - MultiSender dApp`;
              getAccounts()
                .then((accounts) => {
                  const firstAccount = accounts.length > 0 ? accounts[0] : null;
                  var defaultAccount =
                    web3.eth.defaultAccount || firstAccount || null;
                  if (defaultAccount === null) {
                    reject({
                      message:
                        "Please unlock your metamask and refresh the page",
                    });
                    return;
                  }
                  if (
                    web3.eth.estimateGas.__proto__ &&
                    web3.eth.estimateGas.__proto__.call
                  ) {
                    console.log(
                      "typeof web3.eth.estimateGas.__proto__.call:",
                      typeof web3.eth.estimateGas.__proto__.call
                    );
                    web3.eth.estimateGas.call =
                      web3.eth.estimateGas.__proto__.call;
                    console.log(
                      "typeof web3.eth.estimateGas.call:",
                      typeof web3.eth.estimateGas.call
                    );
                  }
                  const results = {
                    web3Instance: web3,
                    netIdName,
                    netId,
                    injectedWeb3: true,
                    defaultAccount,
                    trustApiName,
                    explorerUrl,
                    explorerAPIUrl,
                    gasPriceAPIUrl,
                    currencyTicker,
                    currencyTickerName,
                    blockchainName,
                  };
                  _web3Config = results;
                  console.log("results:", _web3Config);
                  resolve(_web3Config);
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });

          console.log("Injected web3 detected.");
        } else {
          // Fallback to localhost if no web3 injection.
          const errorMsg = `Metamask is not installed. Please go to
          https://metamask.io and return to this page after you installed it`;
          console.log("No web3 instance injected, using Local web3.");
          console.error("Metamask not found");
          reject({ message: errorMsg });
          return;
        }
      });
    });
  }
  return _web3Promise;
};

export default getWeb3;
