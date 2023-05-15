const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, should } = require("chai");
const { ethers } = require("hardhat");

describe("DemoNFTs", function () {
    async function deployDemoNFTsFixture() {
        const [owner, otherAccount1] = await ethers.getSigners();

        const DemoNFTsFactory = await ethers.getContractFactory("DemoNFTs");
        const DemoNFTs = await DemoNFTsFactory.deploy();

        return {
            DemoNFTs,
            owner,
            otherAccount1,
        };
    }

    describe("Deployment", function () {
        it("Should has the correct name and symbol", async function () {
            const { DemoNFTs, owner } = await loadFixture(
                deployDemoNFTsFixture
            );
            const total = await DemoNFTs.balanceOf(owner.address);
            expect(total).to.equal(0);
            expect(await DemoNFTs.name()).to.equal("DemoNFTs");
            expect(await DemoNFTs.symbol()).to.equal("DNFT");
        });
    });

    describe("Mint NFT", function () {
        it("Should mint a token with token ID 0 & 1 to owner", async function () {
            const { DemoNFTs, owner } = await loadFixture(
                deployDemoNFTsFixture
            );

            await DemoNFTs.safeMint(owner.address, "ipfs://xxxxxxxx");
            expect(await DemoNFTs.ownerOf(0)).to.equal(owner.address);

            await DemoNFTs.safeMint(owner.address, "ipfs://xxxxxxxx");
            expect(await DemoNFTs.ownerOf(1)).to.equal(owner.address);

            expect(await DemoNFTs.balanceOf(owner.address)).to.equal(2);
        });
    });
});
