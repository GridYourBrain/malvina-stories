document.getElementById("storyForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("childName").value;
  const age = document.getElementById("childAge").value;
  const gender = document.getElementById("childGender").value;
  const category = document.getElementById("storyCategory").value;
  const emotion = document.getElementById("emotion").value;

  const prompt = `Напиши приказка за дете на ${age} години, ${gender}, на име ${name}. Темата е "${category}", с емоция "${emotion}".`;

  const storyResult = document.getElementById("story-result");
  storyResult.innerText = "Генерираме приказка...";

  try {
    const response = await fetch("https://malvina-backend.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (data.story) {
      storyResult.innerText = data.story;

      // Създаване на бутон "Чети с глас"
      const speakBtn = document.createElement("button");
      speakBtn.innerText = "Чети с глас";
      speakBtn.onclick = () => {
        const utterance = new SpeechSynthesisUtterance(data.story);
        utterance.lang = "bg-BG";
        speechSynthesis.speak(utterance);
      };

      storyResult.appendChild(document.createElement("br"));
      storyResult.appendChild(speakBtn);
    } else {
      storyResult.innerText = "Няма върната приказка.";
    }
  } catch (error) {
    console.error("Грешка при заявката:", error);
    storyResult.innerText = "Грешка при генерирането на приказката.";
  }
});
