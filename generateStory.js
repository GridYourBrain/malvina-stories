// generateStory.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/generate", async (req, res) => {
  const { name, age, gender, world, character, emotion, theme } = req.body;

  const prompt = `Създай кратка приказка (5-6 минути) за дете на име ${name}, което е на ${age} години и е ${gender}.
  Приказката да бъде в стил ${world}, с герой ${character}, който преживява емоцията \"${emotion}\".
  Темата на приказката е \"${theme}\". Историята трябва да бъде подходяща за възрастта, вълнуваща и да завършва позитивно.`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.json({ story: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate story." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
