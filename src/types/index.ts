// Text Encrypted Component Props
export interface TextEncryptedProps {
  text: string;
  interval?: number;
  loop?: boolean;
}

// Equipment Item Interface
export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
} 