import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SegmentedControlIOS,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { captureScreen } from "react-native-view-shot";
import { ArrowLeft } from "phosphor-react-native";

import { theme } from "../../theme";
import { FeedbackType, feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";

import { styles } from "./styles";
import api from "../../libs/api";
import { Copyright } from "../Copyright";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function HandleScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.log(error));
  }

  function HandleScreenshotRemove() {
    setScreenshot(null);
  }
  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    const screenshotBase64 =
      screenshot &&
      FileSystem.readAsStringAsync(screenshot, { encoding: "base64" });

    try {
      const feedbackToSend = {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment,
      };

      await api.post("/feedbacks", feedbackToSend);

      onFeedbackSent();
      setIsSendingFeedback(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={40} // adjust the value here if you need more padding
        behavior="position"
      >
        <TextInput
          multiline
          style={styles.input}
          placeholder="Conte com detalhes o que está acontecendo..."
          placeholderTextColor={theme.colors.text_secondary}
          autoCorrect={false}
          onChangeText={setComment}
        />
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={HandleScreenshot}
          onRemoveShot={HandleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button onPress={handleSendFeedback} isLoading={isSendingFeedback} />
      </View>

      <Copyright />
    </View>
  );
}
