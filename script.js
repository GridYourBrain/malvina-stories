document.getElementById('storyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const theme = document.getElementById('theme').value;
    const character = document.getElementById('character').value;
    const emotion = document.getElementById('emotion').value;
    document.getElementById('storyOutput').innerText = `Приказка за ${character}, който открива ${emotion} през темата за ${theme}.`;
});