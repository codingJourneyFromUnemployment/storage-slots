const hre = require("hardhat");

const addr = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE"

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

  // const key = hre.ethers.toUtf8Bytes("beidi");
  // const slot = hre.ethers.keccak256(key)
  // const value = await hre.ethers.provider.getStorage(addr, slot)
  // console.log(`Storage at ${addr} is ${value}`);

  const contract = await hre.ethers.getContractAt("Storage", addr);
  await contract.check();
}

lookup();
