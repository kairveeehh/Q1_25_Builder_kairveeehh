import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "./wallet.json";
import base58 from "bs58";

const umi = createUmi("https://api.devnet.solana.com");
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {
  try {
    let tx = createNft(umi, {
      mint,
      uri: "https://gateway.irys.xyz/8jAYvV4qhBns9W2eHFjJB37PHmZCmBNviANjYMSpv5Un",
      name: "kairvee's rug",
      sellerFeeBasisPoints: percentAmount(70),
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    console.log(
      `Tx hash: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    );
    console.log(`Mint address: ${mint.publicKey}`);
  } catch (error) {
    console.error(`Oops, something went wrong: ${error}`);
  }
})();
//Tx hash: https://explorer.solana.com/tx/2ia2zFDK5bkgJ2tEWMnCHeNg6RgM7ES2epAyYYgC85KWJYkBfVNRard49ZthqL8e7oWxVDHk6RdmvS8znCa83sBa?cluster=devnet
//Mint address: 7jCdwQyWopseW3YkrFCmbx7NowPua51NfFdXtcYjYzoc