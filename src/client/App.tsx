import { useState, useEffect } from "react";
import { CharacterCreator } from "./components/CharacterCreator";
import { InfoModal } from "./components/InfoModal";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenInfoModal");
    if (!hasSeenModal) {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    sessionStorage.setItem("hasSeenInfoModal", "true");
  };

  return (
    <AppContainer>
      <Title>Character Creator</Title>
      <CharacterCreator />
      {showModal && <InfoModal onClose={handleCloseModal} />}
    </AppContainer>
  );
}

export default App;
