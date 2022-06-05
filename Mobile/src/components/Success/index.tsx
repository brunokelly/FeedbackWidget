import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  Text,
} from "react-native";

import { styles } from "./styles";
import success from "../../assets/success.png";
import { Copyright } from "../Copyright";

interface Props {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={success} style={styles.image} />
      <Text style={styles.title}>Agradecemos o feedback!</Text>
      <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
        <Text style={styles.buttonTitle}>Enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
