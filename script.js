document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("storyForm");
  const resultBox = document.getElementById("story-result");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("childName").value;
    const age = document.getElementById("childAge").value;
    const gender = document.getElementById("childGender").value;
    const category = document.getElementById("storyCategory").value;
    const emotion = document.getElementById("emotion").value;

    try {
      const response = await fetch("https://malvina-backend.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          age,
          gender,
          category,
          emotion
        })
      });

      const data = await response.json();

      if (data.story) {
        resultBox.innerText = data.story;
      } else {
        resultBox.innerText = "Грешка при генерирането на приказката.";
      }
    } catch (error) {
      resultBox.innerText = "Възникна грешка при заявката.";
      console.error("Грешка:", error);
    }
  });
});
