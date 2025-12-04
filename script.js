function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  if(answer === "4") {
    result.textContent = "Rätt! 🎉";
    result.style.color = "green";
  } else {
    result.textContent = "Fel, försök igen! ❌";
    result.style.color = "red";
  }
}
