import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();
  return counter;
}
async function count(counter) {
  console.log("Counter", await counter.count());
}
deploy().then(count);
