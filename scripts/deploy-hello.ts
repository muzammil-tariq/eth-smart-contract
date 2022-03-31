import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
  const helloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = await helloWorld.deploy();
  await hello.deployed();
  return hello;
}
// @ts-ignore
async function sayHello(hello) {
  console.log("say hello", hello.hello());
}
deploy().then(sayHello);
