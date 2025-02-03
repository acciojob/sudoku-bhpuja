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

            if (candidateSwitch.checked) {
                toggleCandidate(selectedCell, num);
            } else {
                selectedCell.textContent = num;
            }
        });
    });

    // Toggle candidate numbers
    function toggleCandidate(cell, num) {
        let currentCandidates = cell.getAttribute("data-candidates") || "";
        let candidates = new Set(currentCandidates.split(""));

        if (candidates.has(num)) {
            candidates.delete(num);
        } else {
            candidates.add(num);
        }

        let sortedCandidates = Array.from(candidates).sort().join("");
        cell.setAttribute("data-candidates", sortedCandidates);
        cell.textContent = sortedCandidates;
    }
});
