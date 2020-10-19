//Minimum buy amount (in ether)
const minAmount = 0.01

const contractAddress='0x666aB260a1a20EFEDD2802137A57B56df97432F5'
const tokenAddress='0xb8cd7BF08E0486E321BA5bed9e9b898816FA313B'

let contractInstance = undefined
let tokenInstance = undefined

const tokenABI =
[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_minter","type":"address"}],"name":"removeMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"governance","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_minter","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"minters","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]

const contractABI = [{"constant":true,"inputs":[],"name":"ceoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"amount","type":"uint256"}],"name":"calculateBuy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"multiplier","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint256"}],"name":"setTokenPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawDMH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"boughtTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"limit","type":"uint256"}],"name":"setBuyLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Buy","type":"event"}]



async function approveMethamask() {
  const failed_methamask_html = `<a class="nav-link nav-btn" href="#" style="color: #fff;
      background-color: #dc3545;
      border-color: #dc3545;"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-patch-exclamation-fll" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="
      margin-right: 2px;
  ">
    <path fill-rule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.553.553 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
  </svg> Failed to connect<img src="images/nav-btn-ic.png" alt=""></a>`

  const success_methamask_html = `<a class="nav-link nav-btn" href="#" style="color: #fff;
      background-color: #28a745;
      border-color: #28a745;"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-patch-check-fll" fill="currentColor" xmlns="http://www.w3.org/2000/svg style="
      margin-right: 2px;
  ">
    <path fill-rule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
  </svg> Wallet connected<img src="images/nav-btn-ic.png" alt=""></a>`

  // Modern dapp browsers...
  if (window.ethereum) {
      window.web3 = new Web3(window.web3.currentProvider)
      try {
          // Request account access if needed
          await ethereum.enable()
          document.getElementById('methamask_status').innerHTML = success_methamask_html
          return
      } catch (error) {
        console.log(error)
          // User denied account access...
          document.getElementById('methamask_status').innerHTML = failed_methamask_html
          return
      }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      document.getElementById('methamask_status').innerHTML = success_methamask_html
      return
  }
  // Non-dapp browsers...
  else {
      document.getElementById('methamask_status').innerHTML = failed_methamask_html
      return
  }
  myaddress = await ethereum.enable()
  myaddress = myaddress[0]
  console.log(myaddress)
}


window.addEventListener('load', async () => {
  await approveMethamask()
})

//rounding functions
function roundToFour(num) {
	return +(Math.floor(num + "e+4") + "e-4");
}
function roundToTwo(num) {
	return +(Math.floor(num + "e+2") + "e-2");
}
function round(num) {
	return +(Math.floor(num + "e+0") + "e-0");
}

const accountInterval1 = setInterval(async function() {
	  myaddress = await ethereum.enable()
    myaddress = myaddress[0]
    if(contractInstance === undefined) {
      contractInstance = new web3.eth.Contract(contractABI, contractAddress)
      tokenInstance = new web3.eth.Contract(tokenABI, tokenAddress)
    }
}, 2000) //executed every 3000ms(3 seconds)

/*
async function load() {
  const _balof= await tokenInstance.methods.balanceOf(myaddress).call()
    document.getElementById("balof").innerHTML=roundToFour(_balof/1000000000000000000)

  const _price= await contractInstance.methods.tokenPrice().call()
    document.getElementById("price").innerHTML=roundToFour(web3.utils.fromWei(_price))

  const _matterbalance= await contractInstance.methods.getTokenBalance().call()
    document.getElementById("available").innerHTML=roundToTwo(_matterbalance/1000000000000000000)
}
*/

async function invest() {
  const gasPrice = await web3.eth.getGasPrice()
  const tosend = web3.utils.toWei(document.getElementById('eth_amount').value.toString(), "ether")
  if(tosend>=web3.utils.toWei(minAmount.toString(), "ether")) {
  	let args = {
      from:myaddress,
      gasPrice:gasPrice,
  		value: tosend,
  	}
    let result = await contractInstance.methods.buy().send(args);
    load()
  } else alert(`Minimum Investment is ${minAmount} ETH`)
}
