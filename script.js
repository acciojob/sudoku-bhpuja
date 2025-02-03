//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    let selectedCell = null;
    const cells = document.querySelectorAll(".standard-cell");
    const numberButtons = document.querySelectorAll(".number-control");
    const candidateSwitch = document.querySelector("#candidate-switch");

    // Select a cell when clicked
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (selectedCell) {
                selectedCell.classList.remove("selected");
            }
            selectedCell = cell;
            selectedCell.classList.add("selected");
        });
    });

    // Handle number button clicks
    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (!selectedCell) return;

            const number = button.textContent;
            const candidateSpan = selectedCell.querySelector(".candidates");
            const valueSpan = selectedCell.querySelector(".value");

            if (candidateSwitch.checked) {
                // Candidate move mode
                let candidates = candidateSpan.textContent.split("").filter(n => n !== " ");
                if (candidates.includes(number)) {
                    candidates = candidates.filter(n => n !== number); // Remove number if it exists
                } else {
                    candidates.push(number); // Add number
                }
                candidates.sort(); // Keep sorted
                candidateSpan.textContent = candidates.join("");
            } else {
                // Normal move mode
                valueSpan.textContent = number;
            }
        });
    });
});
