import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    color: #666;
  }
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
`;

const Message = styled.p`
  color: #666;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const UnderstandButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #357abd;
  }
`;

interface Props {
  onClose: () => void;
}

export function InfoModal({ onClose }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling of the background when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Title>Welcome to Character Creator!</Title>
        <Message>
          Please note that the Replicate service occasionally flags some
          generated images as NSFW and will return an error. This can happen
          even with completely safe prompts due to the sensitivity of the AI
          model's content filter.
        </Message>
        <Message>
          If you receive an error while generating an image, please try your
          request again. The results can vary between attempts.
        </Message>
        <UnderstandButton onClick={handleClose}>I Understand</UnderstandButton>
      </ModalContent>
    </ModalOverlay>
  );
}
