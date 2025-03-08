export interface VoiceRecorderProps {
  onRecordComplete?: (result: { audioURL: string | null; text: string }) => void;
} 