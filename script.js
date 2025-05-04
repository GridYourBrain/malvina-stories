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

      // Показваме бутон за слушане
      const audioBtn = document.createElement("button");
      audioBtn.innerText = "Слушай приказката";
      audioBtn.onclick = async () => {
        const audioRes = await fetch("https://malvina-backend.onrender.com/audio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: data.story })
        });

        const audioBlob = await audioRes.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        const audioPlayer = document.createElement("audio");
        audioPlayer.controls = true;
        audioPlayer.src = audioUrl;

        storyResult.appendChild(document.createElement("br"));
        storyResult.appendChild(audioPlayer);
      };

      storyResult.appendChild(document.createElement("br"));
      storyResult.appendChild(audioBtn);
    } else {
      storyResult.innerText = "Няма върната приказка.";
    }
  } catch (error) {
    console.error("Грешка при заявката:", error);
    storyResult.innerText = "Грешка при генерирането на приказката.";
  }
});

