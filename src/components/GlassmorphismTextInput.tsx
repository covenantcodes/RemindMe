import { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  maxLength: number;
  multiline?: boolean;
  numberOfLines?: number;
};

const GlassmorphismTextInput = ({
  placeholder,
  value,
  onChangeText,
  maxLength,
  multiline,
  numberOfLines,
}: Props) => {
  const [error, setError] = useState(false);

  const handleTextChange = (text: string) => {
    if (text.length <= maxLength) {
      setError(false);
      onChangeText(text);
    } else {
      setError(true);
    }
  };

  return (
    <View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={value}
          onChangeText={handleTextChange}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
      {error && (
        <Text style={styles.errorText}>
          Maximum {maxLength} characters allowed
        </Text>
      )}
    </View>
  );
};

export default GlassmorphismTextInput;

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "white",
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
});
