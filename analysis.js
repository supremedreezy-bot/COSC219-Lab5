
/* COSC 219 — Lab 5
   Arrays, Loops and Iterators
*/

/* ==========================
   PART A — Hangman Helpers
   ========================== */

// A1 — revealWord
function revealWord(word, guessedLetters) {
    return word
        .split("")
        .map(letter =>
            guessedLetters.includes(letter) ? letter : "_"
        )
        .join("");
}

// A2 — hasWon
function hasWon(word, guessedLetters) {
    return word
        .split("")
        .every(letter => guessedLetters.includes(letter));
}


/* ==========================
   PART B — Array Basics
   ========================== */

// B1 — trailNames
function trailNames(trails) {
    return trails.map(trail => trail.name);
}

// B2 — openTrails
function openTrails(trails) {
    return trails.filter(trail => !trail.closed);
}

// B3 — findByName
function findByName(trails, name) {
    return trails.find(trail =>
        trail.name.toLowerCase() === name.toLowerCase()
    );
}

// B4 — sortedByDistance
function sortedByDistance(trails) {
    return [...trails].sort((a, b) => a.km - b.km);
}


/* ==========================
   PART C — Iterators
   ========================== */

// C1 — anyClosed
function anyClosed(trails) {
    return trails.some(trail => trail.closed);
}

// C2 — allUnder
function allUnder(trails, limit) {
    return trails.every(trail => trail.km < limit);
}

// C3 — totalDistance
function totalDistance(trails) {
    const total = trails.reduce(
        (sum, trail) => sum + trail.km,
        0
    );

    return Math.round(total * 10) / 10;
}

// C4 — longestTrail
function longestTrail(trails) {
    return trails.reduce(
        (longest, trail) => {
            if (!longest || trail.km > longest.km) {
                return trail;
            }
            return longest;
        },
        undefined
    );
}

// C5 — countByRating
function countByRating(trails) {
    return trails.reduce((counts, trail) => {
        counts[trail.rating] =
            (counts[trail.rating] ?? 0) + 1;

        return counts;
    }, {});
}


/* ==========================
   PART D — Chaining
   ========================== */

// D1 — openDistance
function openDistance(trails) {
    const total = trails
        .filter(trail => !trail.closed)
        .map(trail => trail.km)
        .reduce((sum, km) => sum + km, 0);

    return Math.round(total * 10) / 10;
}

// D2 — summaryLines
function summaryLines(trails) {
    return trails.map(trail =>
        `${trail.name} — ${trail.km} km, ${trail.rating}` +
        (trail.closed ? " (closed)" : "")
    );
}

// D3 — report
function report(trails) {
    const open = openTrails(trails);
    const longest = longestTrail(open);

    return {
        total: trails.length,
        open: open.length,
        closed: trails.length - open.length,
        openKm: openDistance(trails),
        longestOpen: longest ? longest.name : null,
        byRating: countByRating(trails)
    };
}

