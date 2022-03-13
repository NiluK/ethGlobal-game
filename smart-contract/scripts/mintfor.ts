import { ethers, hardhatArguments, run } from "hardhat";
import { Mintable__factory } from "../artifacts/typechain";
import { getEnv } from "../deploy/utils";

async function main() {
    const address = '0xEd9e46951057846470FF8F404ae38AE10EA1409B';
    const tokenId = 2;
    const mintingBlob = getMintingBlob(tokenId, 'test');
    const owner = getEnv("CONTRACT_OWNER_ADDRESS");

    if (!hardhatArguments.network) {
        throw new Error("please pass --network");
    }

    const [wallet] = await ethers.getSigners();
    const contract = Mintable__factory.connect(address, wallet)
    const result = await contract.mintFor(owner, 1, mintingBlob);
    console.log(result);
}

function getMintingBlob(tokenId: number, blueprint: string) {
    return ethers.utils.toUtf8Bytes(`{${tokenId.toString()}}:{${blueprint}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
