const hre = require("hardhat");

const addr = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"

async function lookup() {
  // eth_getStorageAt
  const key = 21;
  const baseSlot = 0x2;
  const slot = keccak256(key + baseSlot)
  const value0 = await hre.ethers.provider.getStorage(addr, 0)
  console.log(`Storage at ${addr} is ${value0}`);
  const value1 = await hre.ethers.provider.getStorage(addr, 1)
  console.log(`Storage at ${addr} is ${value1}`);
  const value2 = await hre.ethers.provider.getStorage(addr, 2)
  console.log(`Storage at ${addr} is ${value2}`);
}

lookup();
