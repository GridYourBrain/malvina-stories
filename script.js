document.getElementById("storyForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const world = document.getElementById("world").value;
  const character = document.getElementById("character").value;
  const emotion = document.getElementById("emotion").value;
  const theme = document.getElementById("theme").value;

  const prompt = `Създай кратка приказка (5-6 минути) за дете на име ${name}, което е на ${age} години и е ${gender}.
Приказката да бъде в стил ${world}, с герой ${character}, който преживява емоцията "${emotion}".
Темата на приказката е "${theme}". Историята трябва да бъде подходяща за възрастта, вълнуваща и да завършва позитивно.`;

  document.getElementById("storyOutput").innerText = "Генерираме приказката... Моля изчакай.";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const story = data.choices[0].message.content.trim();

    document.getElementById("storyOutput").innerText = story;
  } catch (error) {
    console.error("Грешка при генериране:", error);
    document.getElementById("storyOutput").innerText = "Възникна грешка при генерирането на приказката.";
  }
});
