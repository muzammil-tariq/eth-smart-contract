import { ethers } from "ethers";

function getEth() {
  // @ts-ignore
  const eth = window.ethereum;
  if (!eth) throw new Error("No Ethereum provider found");
  return eth;
}
async function hasAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
  return accounts && accounts.length;
}
async function requestAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[];
  return accounts && accounts.length;
}
async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts()))
    throw new Error("Let me take your money");
  const counter = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    [
      "function count() public",
      "function getCounter() public view returns (uint32)",
    ],
    new ethers.providers.Web3Provider(getEth()).getSigner()
  );
  const el = document.createElement("div");
  async function setCounter() {
    el.innerHTML = await counter.getCounter();
  }
  setCounter();
  const button = document.createElement("button");
  button.innerText = "increment";
  button.onclick = async () => {
    const tx = await counter.count();
    await tx.wait();
    setCounter();
  };
  document.body.appendChild(el);
  document.body.appendChild(button);
}
run();
