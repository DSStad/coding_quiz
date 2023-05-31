const scoreList = document.querySelector("#scores-table");

let scoreRecording = JSON.parse(localStorage.getItem("scoreInput")) || [];
// sort function from scoreRecording
scoreRecording.sort((s1, s2) =>
  s1.score < s2.score ? 1 : s1.score > s2.score ? -1 : 0
);

// iterate through array of objects
for (const score of scoreRecording) {
  let newRecord = document.createElement("tr");
  let scoreTd = document.createElement("td");
  scoreTd.textContent = score.score;
  let initialsTd = document.createElement("td");
  initialsTd.textContent = score.initials;

  newRecord.appendChild(scoreTd);
  newRecord.appendChild(initialsTd);
  scoreList.appendChild(newRecord);
}
