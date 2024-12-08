import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Replicate from "replicate";
import axios from "axios";
import { CharacterAttributes } from "../client/types/character";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/generate-image", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const { attributes } = req.body;

    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("REPLICATE_API_TOKEN is not set");
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // const MODEL_VERSION =
    //   "cjwbw/eimis_anime_diffusion:a409b0769c91cfb3ecfa61698babd73ae34aee400f7894b1f02d28526631ec97";

    const MODEL_VERSION =
      "asiryan/mistoon-anime-xl:06285a5017bb6bdc7314b3914c48896ffbe543ab8fa1ffc114f8894deac22c9d";

    const prompt = generatePrompt(attributes);
    console.log("Generated prompt:", prompt);

    const input = {
      prompt: prompt,
      negative_prompt:
        "lowres, bad anatomy, ((bad hands)), text, error, ((missing fingers)), cropped, jpeg artifacts, worst quality, low quality, signature, watermark, blurry, deformed, extra ears, deformed, disfigured, mutation, censored, ((multiple_girls))",
      height: 768,
      width: 512,
      scheduler: "K_EULER_ANCESTRAL",
      guidance_scale: 9,
      num_inference_steps: 35,
      safety_filter: false,
    };

    const output = await replicate.run(MODEL_VERSION, { input });

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

      res.json({ imageUrl: dataUrl });
    } else {
      throw new Error("Invalid output format from Replicate");
    }
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({
      error: error.message,
      details: error.details || error,
    });
  }
});

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
