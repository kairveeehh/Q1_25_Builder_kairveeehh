import wallet from "./wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
const umi = createUmi("https://api.devnet.solana.com");
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(irysUploader());
umi.use(signerIdentity(signer));
(async () => {
  try {
    const image =
      "https://gateway.irys.xyz/8jAYvV4qhBns9W2eHFjJB37PHmZCmBNviANjYMSpv5Un";
    const metadata = {
      name: "kairvee's rug",
      symbol: "COOKED",
      description: "in the name of lord kairvee",
      image,
      attributes: [{ trait_type: "cooked", value: "1" }],
      properties: { files: [{ type: "image/png", uri: image }] },
      creators: [],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log(`Your metadata uri is: ${myUri}`);
  } catch (error) {
    console.error(`Oops, something went wrong: ${error}`);
  }
})();
//Your metadata uri is: https://gateway.irys.xyz/7okwBUAU9KptDPojQUHzcaKhBNASRcYh2qGbMWvsKRLu
