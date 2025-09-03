import OpenAI from "openai";
import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

const client = new OpenAI({ apiKey: OPENAI_API_KEY });

export default function Index() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    try {
      const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: input }],
      });
      setResponse(res.choices[0].message.content || "");
    } catch (err: any) {
      console.error(err);
      setResponse("Error: " + err.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#7d7d7dff",
        }}
      >
        AI Notes Assistant
      </Text>

      <TextInput
        placeholder="Ask something..."
        value={input}
        onChangeText={setInput}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
          color: "#7d7d7dff",
        }}
      />
      <Button title="Ask AI" onPress={askAI} />

      <ScrollView style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, color: "#7d7d7dff" }}>{response}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
