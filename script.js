function calculateScore(hand) {
    let score = 0;
    for (let i = 0; i < hand.length; i++) {
        score += hand[i].value;
    }
    return score;
}

function countFifteens(hand) {
    // This function counts the number of combinations of cards that sum up to 15
    let count = 0;
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (hand[i].value + hand[j].value === 15) {
                count++;
            }
        }
    }
    return count;
}

function countPairs(hand) {
    // This function counts the number of pairs in the hand
    let count = 0;
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (hand[i].value === hand[j].value) {
                count++;
            }
        }
    }
    return count;
}

function analyzeHand() {
    const card1 = parseInt(document.getElementById("card1").value);
    const suit1 = document.getElementById("suit1").value.toUpperCase();
    const card2 = parseInt(document.getElementById("card2").value);
    const suit2 = document.getElementById("suit2").value.toUpperCase();
    const card3 = parseInt(document.getElementById("card3").value);
    const suit3 = document.getElementById("suit3").value.toUpperCase();
    const card4 = parseInt(document.getElementById("card4").value);
    const suit4 = document.getElementById("suit4").value.toUpperCase();
    const card5 = parseInt(document.getElementById("card5").value);
    const suit5 = document.getElementById("suit5").value.toUpperCase();
    const card6 = parseInt(document.getElementById("card6").value);
    const suit6 = document.getElementById("suit6").value.toUpperCase();

    if (isNaN(card1) || isNaN(card2) || isNaN(card3) || isNaN(card4) || isNaN(card5) || isNaN(card6)) {
        alert("Please enter valid card values (1-13).");
        return;
    }

    const cards = [
        { value: card1, suit: suit1 },
        { value: card2, suit: suit2 },
        { value: card3, suit: suit3 },
        { value: card4, suit: suit4 },
        { value: card5, suit: suit5 },
        { value: card6, suit: suit6 }
    ];

    // Find the best hand to keep and the best cards to put in the crib
    let bestHand = null;
    let maxScore = 0;
    let explanation = "";

    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            for (let k = j + 1; k < cards.length; k++) {
                for (let l = k + 1; l < cards.length; l++) {
                    const hand = [cards[i], cards[j], cards[k], cards[l]];
                    const crib = cards.filter((card, index) => index !== i && index !== j && index !== k && index !== l);
                    const score = calculateScore(hand);

                    // Check if the hand has higher score than the current best hand
                    if (score > maxScore) {
                        maxScore = score;
                        bestHand = { hand: hand, crib: crib };
                        explanation = "This combination has the highest total score.";
                    } else if (score === maxScore) {
                        // If the score is tied, provide additional explanations based on common cribbage strategies
                        const fifteensCount = countFifteens(hand);
                        const pairsCount = countPairs(hand);
                        if (fifteensCount > 0 && fifteensCount > countFifteens(bestHand.hand)) {
                            // More fifteens is generally better
                            bestHand = { hand: hand, crib: crib };
                            explanation = "This combination has more combinations that sum up to 15.";
                        } else if (pairsCount > countPairs(bestHand.hand)) {
                            // More pairs is generally better
                            bestHand = { hand: hand, crib: crib };
                            explanation = "This combination has more pairs.";
                        }
                    }
                }
            }
        }
    }

    // Display the best hand and explanation
    document.getElementById("result").innerHTML = "Best hand to keep: " + formatHand(bestHand.hand) + "<br>Best cards to put in the crib: " + formatHand(bestHand.crib) + "<br><br>Explanation: " + explanation;
}

function formatHand(cards) {
    let formattedHand = "";
    for (let i = 0; i < cards.length; i++) {
        formattedHand += cards[i].value + " of " + cards[i].suit;
        if (i < cards.length - 1) {
            formattedHand += ", ";
        }
    }
    return formattedHand;
}
