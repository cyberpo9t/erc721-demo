const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xEAb40A0DE2b98d5CCC1d32C7B9a3a5CB2dEca79d";
const META_DATA_URL =
    "ipfs://bafkreibfgr6bjrsdns3kjdkzamuy6abdi2e36icj27xbalypb5tpnc2dji";

async function safeMint(contractAddress, metaDataURL) {
    const DemoNFTs = await ethers.getContractFactory("DemoNFTs");
    const [owner] = await ethers.getSigners();
    await DemoNFTs.attach(CONTRACT_ADDRESS).safeMint(
        owner.address,
        metaDataURL
    );
    console.log("NFT minted to: ", owner.address);
}

safeMint(CONTRACT_ADDRESS, META_DATA_URL)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
