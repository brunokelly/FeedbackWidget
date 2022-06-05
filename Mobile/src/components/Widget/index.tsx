import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import { ChatTeardropDots } from "phosphor-react-native";

import { Options } from "../Options";
import { Form } from "../Form";

import { theme } from "../../theme";
import { styles } from "./styles";
import { Success } from "../Success";
import { FeedbackType } from "../../utils/feedbackTypes";

function Widget() {
  const bottomSheetRef = useRef<bottomSheet>(null);
  const [feedbackTypeForm, setFeedbackTypeForm] = useState<FeedbackType | null>(
    null
  );
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackTypeForm(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackTypeForm(null);
    setFeedbackSent(false);
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
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {feedbackTypeForm ? (
              <Form
                feedbackType={feedbackTypeForm}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options onFeedbackChanged={setFeedbackTypeForm} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
