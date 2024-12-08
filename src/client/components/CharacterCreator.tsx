import { useState, useCallback } from "react";
import styled from "@emotion/styled";
import { CharacterAttributes, defaultCharacter } from "../types/character";
import { generateCharacterImage } from "../services/imageGeneration";
import { CharacterOptions } from "./CharacterOptions";
import { CharacterDisplay } from "./CharacterDisplay";
import { ErrorPopup } from "./ErrorPopup";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export function CharacterCreator() {
  const [attributes, setAttributes] =
    useState<CharacterAttributes>(defaultCharacter);
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  let timerInterval: ReturnType<typeof setInterval>;

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setElapsedTime(0);
    const startTime = Date.now();

    timerInterval = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 100);

    try {
      const data = await generateCharacterImage(attributes);
      setImageData(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
      clearInterval(timerInterval);
    }
  }, [attributes]);

  return (
    <>
      <Container>
        <CharacterDisplay
          imageUrl={imageData}
          loading={loading}
          elapsedTime={elapsedTime}
        />
        <CharacterOptions
          attributes={attributes}
          onChange={setAttributes}
          onGenerate={handleGenerate}
          isGenerating={loading}
        />
      </Container>

      {error && (
        <ErrorPopup
          error={error}
          onRetry={handleGenerate}
          onClose={() => setError(null)}
        />
      )}
    </>
  );
}
