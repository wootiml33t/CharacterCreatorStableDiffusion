import styled from "@emotion/styled";

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3f3f3f;
  border-radius: 8px;
  padding: 20px;
  min-height: 600px;
  min-width: 400px;
  max-width: 400px;
`;

const CharacterImage = styled.img`
  max-width: 100%;
  max-height: 600px;
  border-radius: 4px;
`;

const LoadingContainer = styled.div`
  text-align: center;
`;

const Timer = styled.div`
  margin-top: 10px;
  color: #666;
`;

interface Props {
  imageUrl: string | null;
  loading: boolean;
  elapsedTime: number;
}

export function CharacterDisplay({ imageUrl, loading, elapsedTime }: Props) {
  return (
    <DisplayContainer>
      {loading ? (
        <LoadingContainer>
          <div>Generating your character...</div>
          <Timer>Time elapsed: {elapsedTime.toFixed(1)} seconds</Timer>
        </LoadingContainer>
      ) : imageUrl ? (
        <CharacterImage src={imageUrl} alt="Generated character" />
      ) : (
        <div>
          Select options and click "Generate Character" to create your character
        </div>
      )}
    </DisplayContainer>
  );
}
