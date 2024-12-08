import type { VercelRequest, VercelResponse } from "@vercel/node";
import Replicate from "replicate";
import axios from "axios";
import { CharacterAttributes } from "../src/client/types/character";

// const MODEL_VERSION =
//   "cjwbw/eimis_anime_diffusion:a409b0769c91cfb3ecfa61698babd73ae34aee400f7894b1f02d28526631ec97";

const MODEL_VERSION =
  "asiryan/mistoon-anime-xl:06285a5017bb6bdc7314b3914c48896ffbe543ab8fa1ffc114f8894deac22c9d";

function generatePrompt(attributes: CharacterAttributes): string {
  const accessoriesText =
    attributes.accessories?.length > 0
      ? `wearing ${attributes.accessories.join(", ")}, `
      : "";

  return `sfw, detailed, completely clothed, ${attributes.gender},
      ${attributes.skinColor} skin tone, ${attributes.height} height,
      ${attributes.hairStyle} ${attributes.hairColor} hair,
      ${attributes.eyeColor} eyes, ${attributes.faceShape} face shape,
      ${attributes.expression} expression, ${attributes.pose},
      wearing ${attributes.outfit}, ${accessoriesText}
      detailed clothing, (high quality:1.4), masterpiece`
    .replace(/\s+/g, " ")
    .trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Received request body:", req.body);
    const { attributes } = req.body;

    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("REPLICATE_API_TOKEN is not set");
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const input = {
      prompt: generatePrompt(attributes),
      negative_prompt:
        "lowres, bad anatomy, ((bad hands)), text, error, ((missing fingers)), cropped, jpeg artifacts, worst quality, low quality, signature, watermark, blurry, deformed, extra ears, deformed, disfigured, mutation, censored, ((multiple_girls))",
      height: 768,
      width: 512,
      scheduler: "K_EULER_ANCESTRAL",
      guidance_scale: 9,
      num_inference_steps: 35,
      safety_filter: false,
    };

    console.log("Sending request to Replicate with input:", input);

    const output = await replicate.run(MODEL_VERSION, { input });
    console.log("Received output from Replicate:", output);

    if (output && Array.isArray(output) && output[0]) {
      const imageUrl = output[0];

      // Download and convert image to base64
      const imageResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      const base64Image = Buffer.from(imageResponse.data, "binary").toString(
        "base64"
      );
      const dataUrl = `data:image/png;base64,${base64Image}`;

      return res.status(200).json({ imageUrl: dataUrl });
    } else {
      throw new Error("Invalid output format from Replicate");
    }
  } catch (error: any) {
    console.error("Error in generate-image handler:", error);
    return res.status(500).json({
      error: error.message,
      details: error.details || error,
    });
  }
}
