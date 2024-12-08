import axios from "axios";
import { CharacterAttributes } from "../types/character";

export async function generateCharacterImage(
  attributes: CharacterAttributes
): Promise<string> {
  try {
    console.log("Sending request with attributes:", attributes);
    const response = await axios.post(
      "/api/generate-image",
      {
        attributes,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    console.log("Received response:", response.data);
    return response.data.imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
