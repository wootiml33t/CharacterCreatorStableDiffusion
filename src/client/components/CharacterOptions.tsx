import styled from "@emotion/styled";
import { CharacterAttributes, characterOptions } from "../types/character";

const OptionsContainer = styled.div`
  padding: 20px;
  background-color: #3f3f3f;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 80vh;
`;

const OptionGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Button = styled.button`
  width: 360px;
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background-color: #357abd;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

interface Props {
  attributes: CharacterAttributes;
  onChange: (attributes: CharacterAttributes) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function CharacterOptions({
  attributes,
  onChange,
  onGenerate,
  isGenerating,
}: Props) {
  const handleChange = (key: keyof CharacterAttributes, value: any) => {
    onChange({ ...attributes, [key]: value });
  };

  const handleAccessoryToggle = (accessory: string) => {
    const newAccessories = attributes.accessories.includes(accessory)
      ? attributes.accessories.filter((a) => a !== accessory)
      : [...attributes.accessories, accessory];
    handleChange("accessories", newAccessories);
  };

  return (
    <OptionsContainer>
      <h2>Character Options</h2>

      <OptionGroup>
        <Label>Gender</Label>
        <Select
          value={attributes.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </Select>

        <Label>Skin Color</Label>
        <Select
          value={attributes.skinColor}
          onChange={(e) => handleChange("skinColor", e.target.value)}
        >
          {characterOptions.skinColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>

        <Label>Pose</Label>
        <Select
          value={attributes.pose}
          onChange={(e) => handleChange("pose", e.target.value)}
        >
          {characterOptions.poses.map((pose) => (
            <option key={pose} value={pose}>
              {pose}
            </option>
          ))}
        </Select>

        <Label>Face Shape</Label>
        <Select
          value={attributes.faceShape}
          onChange={(e) => handleChange("faceShape", e.target.value)}
        >
          {characterOptions.faceShapes.map((shape) => (
            <option key={shape} value={shape}>
              {shape}
            </option>
          ))}
        </Select>

        <Label>Face Expression</Label>
        <Select
          value={attributes.expression}
          onChange={(e) => handleChange("expression", e.target.value)}
        >
          {characterOptions.expressions.map((expression) => (
            <option key={expression} value={expression}>
              {expression}
            </option>
          ))}
        </Select>

        <Label>Eye Color</Label>
        <Select
          value={attributes.eyeColor}
          onChange={(e) => handleChange("eyeColor", e.target.value)}
        >
          {characterOptions.eyeColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>

        <Label>Hair Color</Label>
        <Select
          value={attributes.hairColor}
          onChange={(e) => handleChange("hairColor", e.target.value)}
        >
          {characterOptions.hairColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>

        <Label>Hair Style</Label>
        <Select
          value={attributes.hairStyle}
          onChange={(e) => handleChange("hairStyle", e.target.value)}
        >
          {characterOptions.hairStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </Select>
      </OptionGroup>

      <OptionGroup>
        <Label>Outfit</Label>
        <Select
          value={attributes.outfit}
          onChange={(e) => handleChange("outfit", e.target.value)}
        >
          {characterOptions.outfits.map((outfit) => (
            <option key={outfit} value={outfit}>
              {outfit}
            </option>
          ))}
        </Select>
        <Label>Accessories</Label>
        <CheckboxGroup>
          {characterOptions.accessories.map((accessory) => (
            <Checkbox key={accessory}>
              <input
                type="checkbox"
                checked={attributes.accessories.includes(accessory)}
                onChange={() => handleAccessoryToggle(accessory)}
              />
              {accessory}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </OptionGroup>

      <Button onClick={onGenerate} disabled={isGenerating}>
        {isGenerating ? "Generating Character..." : "Generate Character"}
      </Button>
    </OptionsContainer>
  );
}
