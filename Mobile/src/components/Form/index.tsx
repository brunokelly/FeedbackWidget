import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { ArrowLeft } from "phosphor-react-native";

import { theme } from "../../theme";
import { FeedbackType, feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";

import { styles } from "./styles";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
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

        <TextInput
          multiline
          style={styles.input}
          placeholder="Conte com detalhes o que está acontecendo..."
          placeholderTextColor={theme.colors.text_secondary}
          autoCorrect={false}
        />
        <View style={styles.footer}>
          <ScreenshotButton
            onTakeShot={HandleScreenshot}
            onRemoveShot={HandleScreenshotRemove}
            screenshot=""
          />

          <Button isLoading={false} />
        </View>
      </View>
    </View>
  );
}
