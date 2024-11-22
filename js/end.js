const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const scoreEle = document.querySelector("p");
const input = document.querySelector("input");
const button = document.querySelector("button");

scoreEle.innerText = score;

const saveHandler = () => {
  if (!input.value || !score) {
    alert("Invalid name or score");
  } else {
    const finalscore = { name: input.value, score };
    highScores.push(finalscore);
    highScores.sort((a, b) => b.score - a.score); // One unique method for sorting an array in js.
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("score");
    window.location.assign("/"); // "/" => forwarding to index.html
  }
};

button.addEventListener("click", saveHandler);
