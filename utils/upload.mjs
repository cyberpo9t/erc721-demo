import { NFTStorage, File } from "nft.storage";
import mime from "mime";
import fs from "fs";
import path from "path";

const NFT_STORAGE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYyNjUyOEE1MDc0YjQ3YTg4ZjU0Njc3ZjcwMDRBZTk0NTlGMzc2OTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MjA2MTM5NzQyOSwibmFtZSI6ImxlYXJuaW5nIn0.zvs46Xds8umMaveiUE0P5zo45fUcXbizbtu-XcPgweE";

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
async function storeNFT(imagePath, name, description) {
    const image = await fileFromPath(imagePath);
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    return nftstorage.store({
        image,
        name,
        description,
    });
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath);
    const type = mime.getType(filePath);
    return new File([content], path.basename(filePath), { type });
}

/**
 * The main entry point for the script that checks the command line arguments and
 * calls storeNFT.
 *
 * To simplify the example, we don't do any fancy command line parsing. Just three
 * positional arguments for imagePath, name, and description
 */
async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 3) {
        console.error(
            `usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`
        );
        process.exit(1);
    }

    const [imagePath, name, description] = args;
    const result = await storeNFT(imagePath, name, description);
    console.log(result);
}

// Don't forget to actually call the main function!
// We can't `await` things at the top level, so this adds
// a .catch() to grab any errors and print them to the console.
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
