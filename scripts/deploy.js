const { ethers } = require("hardhat");

async function main() {
    const DemoNFTsFactory = await ethers.getContractFactory("DemoNFTs");
    console.log("Deploying contract...");
    const demoNFTs = await DemoNFTsFactory.deploy();
    await demoNFTs.deployed();
    console.log(`Deployed contract to: ${demoNFTs.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
