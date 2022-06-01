import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import { ChatTeardropDots } from "phosphor-react-native";

import { Options } from "../Options";
import { Form } from "../Form";

import { theme } from "../../theme";
import { styles } from "./styles";
import { Success } from "../Success";

function Widget() {
  const bottomSheetRef = useRef<bottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        <Success />
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
