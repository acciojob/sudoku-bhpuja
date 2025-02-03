document.addEventListener("DOMContentLoaded", () => {
    let selectedCell = null;
    const candidateSwitch = document.getElementById("candidate-switch");
    const numberButtons = document.querySelectorAll(".number-button");
    const cells = document.querySelectorAll(".cell");

    // Function to select a cell
    function selectCell(cell) {
        // Remove the 'selected' class from the previously selected cell, if any
        if (selectedCell) {
            selectedCell.classList.remove("selected");
        }
        // Add the 'selected' class to the clicked cell
        selectedCell = cell;
        selectedCell.classList.add("selected");
    }

    // Add event listener to each cell to select it
    cells.forEach(cell => {
        if (!cell.classList.contains("given-number")) {
            cell.addEventListener("click", () => selectCell(cell));
        }
    });

    // Function to update the .value or .candidates span based on the mode
    function updateCellValue(number) {
        if (!selectedCell) return; // If no cell is selected, do nothing
        
        const valueSpan = selectedCell.querySelector(".value");
        const candidatesSpan = selectedCell.querySelector(".candidates");

        if (candidateSwitch.checked) {
            // In "Candidate Move" mode, toggle the number in the candidates list
            const candidates = candidatesSpan.textContent.split('').map(Number);
            const index = candidates.indexOf(number);
            if (index === -1) {
                candidates.push(number); // Add number to candidates
            } else {
                candidates.splice(index, 1); // Remove number from candidates
            }
            candidates.sort((a, b) => a - b); // Sort the candidates in ascending order
            candidatesSpan.textContent = candidates.join(''); // Update the candidates span
        } else {
            // In "Normal Move" mode, place the number in the .value span
            valueSpan.textContent = number;
            candidatesSpan.textContent = ''; // Clear candidates when a value is placed
        }
    }

    // Add event listeners to number buttons (1-9)
    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            const number = parseInt(button.textContent);
            updateCellValue(number);
        });
    });
});
