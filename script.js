//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    let selectedCell = null;
    const board = document.getElementById("sudoku-board");
    const numberButtons = document.querySelectorAll(".num-btn");
    const candidateSwitch = document.getElementById("candidate-switch");

    // Select cell
    board.addEventListener("click", (event) => {
        if (event.target.classList.contains("cell") && !event.target.classList.contains("given-number")) {
            if (selectedCell) {
                selectedCell.classList.remove("selected");
            }
            selectedCell = event.target;
            selectedCell.classList.add("selected");
        }
    });

    // Number button click
    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (!selectedCell) return;

            let num = button.textContent;
            let valueSpan = selectedCell.querySelector(".value");
            let candidatesSpan = selectedCell.querySelector(".candidates");

            if (candidateSwitch.checked) {
                toggleCandidate(candidatesSpan, num);
            } else {
                valueSpan.textContent = num;
                candidatesSpan.textContent = "";  // Clear candidates when setting a normal number
            }
        });
    });

    // Toggle candidate numbers
    function toggleCandidate(candidatesSpan, num) {
        let candidates = new Set(candidatesSpan.textContent.split(""));
        
        if (candidates.has(num)) {
            candidates.delete(num);
        } else {
            candidates.add(num);
        }

        let sortedCandidates = Array.from(candidates).sort().join("");
        candidatesSpan.textContent = sortedCandidates;
    }
});
