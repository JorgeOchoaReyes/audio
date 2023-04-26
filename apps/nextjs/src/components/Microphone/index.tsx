import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, Text } from "@nextui-org/react";
import { Box } from "../Box";
import { BiMicrophoneOff, BiMicrophone } from "react-icons/bi";
import { useHasHydrated } from "../../hooks/hasHydrated";

interface IProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Microphone = ({ setText }: IProps) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const hasHydrated = useHasHydrated();

  useEffect(() => {
    if (transcript) setText(transcript);
  }, [setText, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <Text>Browser does not support speech recognition.</Text>;
  }

  return (
    <div className="mb-20 flex w-full flex-col content-center items-center justify-center">
      {hasHydrated && (
        <Text className="mb-5">
          {listening ? (
            <BiMicrophone color="white" size={50} />
          ) : (
            <BiMicrophoneOff color="white" size={50} />
          )}
        </Text>
      )}
      <Box className="flex flex-row ">
        <Button
          className="mr-2"
          color={"success"}
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        >
          Start
        </Button>
        <Button
          className="mr-2"
          color={"error"}
          onClick={() => SpeechRecognition.stopListening()}
        >
          Stop
        </Button>
        <Button
          color={"warning"}
          className="mr-2"
          onClick={() => {
            resetTranscript();
            setText("");
          }}
        >
          Reset
        </Button>
      </Box>
    </div>
  );
};
export default Microphone;
