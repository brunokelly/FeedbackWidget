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

export function Success() {
  return (
    <View style={styles.container}>
      <Image source={success} style={styles.image} />
      <Text style={styles.title}>Agradecemos o feedback!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>Enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
