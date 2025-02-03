const colors = [
	"#FF6B6B",
	"#4ECDC4",
	"#45B7D1",
	"#96CEB4",
	"#FFEEAD",
	"#D4A5A5",
	"#9B59B6",
	"#3498DB",
	"#E74C3C",
	"#2ECC71",
	"#F1C40F",
	"#E67E22",

	"#1ABC9C",
	"#8E44AD",
	"#16A085",
	"#D35400",
	"#27AE60",
	"#2980B9",
	"#C0392B",
	"#7F8C8D",
	"#34495E",
	"#8E44AD",
	"#FFA07A",
	"#20B2AA",
	"#BA55D3",
	"#32CD32",
	"#FF69B4",
	"#4169E1",
	"#FFD700",
	"#48D1CC",
];
const gameState = {
	score: 0,
	targetColor: "",
	options: [],
};

const elements = {
	colorBox: document.querySelector('[data-testid="colorBox"]'),
	colorOptions: document.querySelector(".color-options"),
	score: document.querySelector('[data-testid="score"]'),
	newGameBtn: document.querySelector('[data-testid="newGameButton"]'),
	shuffleBtn: document.querySelector('[data-testid="shuffleButton"]'),
	gameStatus: document.querySelector('[data-testid="gameStatus"]'),
};

function getRandomColors(count) {
	const shuffled = [...colors].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

function showGameStatus(message, isCorrect) {
	elements.gameStatus.textContent = message;
	elements.gameStatus.className =
		"game-status show " + (isCorrect ? "correct" : "wrong");
}

function handleGuess(color) {
	if (color === gameState.targetColor) {
		gameState.score++;
		elements.score.textContent = `Score: ${gameState.score}`;
		showGameStatus("Correct! Well done! 🎉", true);
		elements.colorBox.classList.add("correct-animation");

		setTimeout(() => {
			startNewGame();
			elements.colorBox.classList.remove("correct-animation");
		}, 1000);
	} else {
		showGameStatus("Wrong! Game Over! 😢", false);
		elements.colorBox.classList.add("shake-animation");

		setTimeout(() => {
			gameState.score = 0;
			elements.score.textContent = `Score: ${gameState.score}`;
			startNewGame();
			elements.colorBox.classList.remove("shake-animation");
		}, 1000);
	}
}

elements.shuffleBtn.addEventListener("click", function () {
	this.classList.add("rotating");
	setTimeout(() => {
		this.classList.remove("rotating");
	}, 500);
});

function createColorOptions() {
	elements.colorOptions.innerHTML = "";
	gameState.options.forEach((color) => {
		const button = document.createElement("button");
		button.setAttribute("data-testid", "colorOption");
		button.className = "color-option";
		button.style.backgroundColor = color;
		button.onclick = () => handleGuess(color);
		elements.colorOptions.appendChild(button);
	});
}

function shuffleColors() {
	const currentTarget = gameState.targetColor;
	gameState.options = getRandomColors(5);
	gameState.options.push(currentTarget);
	gameState.options.sort(() => 0.5 - Math.random());
	createColorOptions();
}

function startNewGame() {
	gameState.options = getRandomColors(6);
	gameState.targetColor =
		gameState.options[Math.floor(Math.random() * gameState.options.length)];

	elements.colorBox.style.backgroundColor = gameState.targetColor;
	elements.gameStatus.className = "game-status";

	createColorOptions();
}

elements.newGameBtn.addEventListener("click", startNewGame);
elements.shuffleBtn.addEventListener("click", shuffleColors);

startNewGame();
