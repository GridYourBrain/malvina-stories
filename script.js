document.getElementById("storyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const world = document.getElementById("world").value;
  const character = document.getElementById("character").value;
  const emotion = document.getElementById("emotion").value;
  const theme = document.getElementById("theme").value;

  const story = `Приказка за ${character}, който/която преживява емоцията "${emotion}" в свят "${world}".
  Темата на приказката е "${theme}", а героят е ${gender === "момиче" ? "момиче" : "момче"} на ${age} години на име ${name}.`;

  document.getElementById("storyOutput").innerText = story;
});
