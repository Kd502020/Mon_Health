import { expect } from "chai";
import { ethers } from "hardhat";
import { AfitID } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("AfitID", function () {
  let afitID: AfitID;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const AfitID = await ethers.getContractFactory("AfitID");
    afitID = await AfitID.deploy();
    await afitID.deployed();
  });

  it("Should upload data correctly", async function () {
    const ipfsHash = "QmTest123";
    await afitID.connect(user1).uploadData(ipfsHash);
    expect(await afitID.userIpfsHash(user1.address)).to.equal(ipfsHash);
  });

  it("Should grant and revoke access correctly", async function () {
    await afitID.connect(user1).grantAccess(user1.address, user2.address);
    expect(await afitID.hasAccess(user1.address, user2.address)).to.be.true;

    await afitID.connect(user1).revokeAccess(user1.address, user2.address);
    expect(await afitID.hasAccess(user1.address, user2.address)).to.be.false;
  });

  it("Should prevent unauthorized access to data", async function () {
    const ipfsHash = "QmTest123";
    await afitID.connect(user1).uploadData(ipfsHash);
    await expect(
      afitID.connect(user2).getDataHash(user1.address)
    ).to.be.revertedWith("Access denied.");
  });
});
