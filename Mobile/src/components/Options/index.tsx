import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { Copyright } from "../Copyright";
import { Option } from "../Option";
import { feedbackTypes, FeedbackType } from "../../utils/feedbackTypes";

interface Props {
  onFeedbackChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackChanged }: Props) {
  return (
    <View style={styles.container}>
      <Text>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackChanged(key as FeedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
