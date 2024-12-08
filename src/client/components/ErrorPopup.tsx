import styled from "@emotion/styled";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: #333333;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
`;

const ErrorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ErrorDetails = styled.pre`
  background: #181818;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 10px 0;
  max-height: 200px;
  overflow-y: auto;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-right: 10px;

  &.retry {
    background: #4a90e2;
    color: white;
  }

  &.close {
    background: #757575;
  }
`;

interface Props {
  error: Error;
  onRetry: () => void;
  onClose: () => void;
}

export function ErrorPopup({ error, onRetry, onClose }: Props) {
  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <ErrorHeader>
          <h3>Error Generating Image</h3>
          <button onClick={onClose}>×</button>
        </ErrorHeader>
        <p>{error.message}</p>
        <details>
          <summary>Error Details</summary>
          <ErrorDetails>{JSON.stringify(error, null, 2)}</ErrorDetails>
        </details>
        <div style={{ marginTop: "20px" }}>
          <Button className="retry" onClick={onRetry}>
            Retry
          </Button>
          <Button className="close" onClick={onClose}>
            Close
          </Button>
        </div>
      </PopupContent>
    </PopupOverlay>
  );
}
