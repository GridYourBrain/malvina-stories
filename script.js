document.getElementById('storyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.name.value;
    const theme = this.theme.value;
    const character = this.character.value;

    const story = `${name} тръгна на вълшебно приключение с ${character}. Тяхната тема беше: ${theme}. И всичко завърши щастливо!`;

    document.getElementById('storyOutput').innerText = story;
});
