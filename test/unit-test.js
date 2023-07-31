const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { assert } = require("chai");

describe("Proxy", function () {
  async function deployFixture() {

    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();

    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();

    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();

    return { proxy, logic1, logic2 };
  }

  it("should work with logic1", async function () {
    const { proxy, logic1 } = await loadFixture(deployFixture);
    const logic1Address = await logic1.getAddress();
    await proxy.changeImplementation(logic1Address);
    await proxy.changeX(52);
    assert.equal(await logic1.x(), 52);
  });

  it("should work with upgrades", async function () {
    const { proxy, logic1, logic2 } = await loadFixture(deployFixture);
    const logic1Address = await logic1.getAddress();
    const logic2Address = await logic2.getAddress();
    await proxy.changeImplementation(logic1Address);
    assert.equal(await logic1.x(), 0);
    await proxy.changeX(45);
    assert.equal(await logic1.x(), 45);

    await proxy.changeImplementation(logic2Address);
    assert.equal(await logic2.x(), 0);
    await proxy.changeX(48);
    assert.equal(await logic2.x(), 96);
  });

});


