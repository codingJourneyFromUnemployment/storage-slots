const hre = require("hardhat");

const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

async function lookup() {
  // eth_getStorageAt
  // const key = hre.ethers.zeroPadValue(hre.ethers.toBeArray(33), 32)
  // const baseSlot = hre.ethers.zeroPadValue(hre.ethers.toBeArray(0x2), 32)
  // console.log({key, baseSlot})
  // const slot = hre.ethers.keccak256(key + baseSlot.substring(2))
  // const value0 = await hre.ethers.provider.getStorage(addr, 0)
  // console.log(`Storage at ${addr} is ${value0}`);
  // const value1 = await hre.ethers.provider.getStorage(addr, 1)
  // console.log(`Storage at ${addr} is ${value1}`);
  // const value2 = await hre.ethers.provider.getStorage(addr, slot)
  // console.log(`Storage at ${addr} is ${value2}`);

  const key = hre.ethers.toUtf8Bytes("beidi");
  const slot = hre.ethers.keccak256(key)
  const value = await hre.ethers.provider.getStorage(addr, slot)
  console.log(`Storage at ${addr} is ${value}`);
}

lookup();
