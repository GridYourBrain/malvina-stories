document.getElementById("storyForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("childName").value;
  const age = document.getElementById("childAge").value;
  const gender = document.getElementById("childGender").value;
  const category = document.getElementById("storyCategory").value;
  const emotion = document.getElementById("emotion").value;

  const prompt = `Напиши приказка за дете на ${age} години, ${gender}, на име ${name}. Темата е "${category}", с емоция "${emotion}".`;

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
      document.getElementById("story-result").innerText = data.story;
    } else {
      document.getElementById("story-result").innerText = "Няма върната приказка.";
    }
  } catch (error) {
    console.error("Грешка при заявката:", error);
    document.getElementById("story-result").innerText = "Грешка при генерирането на приказката.";
  }
});
