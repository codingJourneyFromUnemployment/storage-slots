const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Proxy", function () {
  async function deployFixture() {

    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();
    const proxyAddress = await proxy.getAddress();

    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();
    const logic1Address = await logic1.getAddress();

    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();
    const logic2Address = await logic2.getAddress();

    const proxyAsLogic1 = await ethers.getContractAt("Logic1", proxyAddress);
    const proxyAsLogic2 = await ethers.getContractAt("Logic2", proxyAddress);

    return { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 };
  }

  async function lookupUint(contractAdd, slot) {
    return parseInt(await ethers.provider.getStorage(contractAdd, slot));
  }

  it("should work with logic1", async function () {
    const { proxy, logic1 } = await loadFixture(deployFixture);
    const logic1Address = await logic1.getAddress();
    await proxy.changeImplementation(logic1Address);
    await proxy.changeX(52);
    assert.equal(await lookupUint(logic1Address, "0x0"), 52);
  });

  it("should work with upgrades", async function () {
    const { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2  } = await loadFixture(deployFixture);
    const logic1Address = await logic1.getAddress();
    const logic2Address = await logic2.getAddress();
    const signer = await ethers.getSigners()[0];
    const proxyAddress = await proxy.getAddress();

    await proxy.changeImplementation(logic1Address);
    assert.equal(await lookupUint(logic1Address, "0x0"), 0);
    await proxy.changeX(45);
    assert.equal(await lookupUint(logic1Address, "0x0"), 45);

    await proxy.changeImplementation(logic2Address);
    assert.equal(await lookupUint(logic2Address, "0x0"), 0);
    await proxy.changeX(11);
    assert.equal(await lookupUint(logic2Address, "0x0"), 11);

    await proxyAsLogic2.changeX(25);
    await proxyAsLogic2.tripleX();
    assert.equal(await lookupUint(logic2Address, "0x0"), 75);

  });

});



