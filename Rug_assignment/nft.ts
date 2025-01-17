import wallet from "./wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";
const umi = createUmi("https://api.devnet.solana.com");
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(irysUploader());
umi.use(signerIdentity(signer));
(async () => {
  try {
    const image = await readFile("./generug.png");
    const genericImg = createGenericFile(image, "generug.png");
    const [myUri] = await umi.uploader.upload([genericImg]);
    console.log(`Image uri is: ${myUri}`);
  } catch (error) {
    console.error(`Oops, something went wrong: ${error}`);
  }
})();

//Image uri is: https://gateway.irys.xyz/8jAYvV4qhBns9W2eHFjJB37PHmZCmBNviANjYMSpv5Un