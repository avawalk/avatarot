const majorArcana = [
    { name: "The Fool", image: "assets/tarot/the-fool.jpg", meaning: "New beginnings, spontaneity, freedom", score: 70 },
    { name: "The Magician", image: "assets/tarot/the-magician.jpg", meaning: "Manifestation, resourcefulness, power", score: 90 },
    { name: "The High Priestess", image: "assets/tarot/the-high-priestess.jpg", meaning: "Intuition, mystery, wisdom", score: 50 },
    { name: "The Empress", image: "assets/tarot/the-empress.jpg", meaning: "Abundance, nature, nurturing", score: 85 },
    { name: "The Emperor", image: "assets/tarot/the-emperor.jpg", meaning: "Authority, structure, control", score: 90 },
    { name: "The Hierophant", image: "assets/tarot/the-hierophant.jpg", meaning: "Tradition, morality, spirituality", score: 75 },
    { name: "The Lovers", image: "assets/tarot/the-lovers.jpg", meaning: "Love, harmony, relationships", score: 80 },
    { name: "The Chariot", image: "assets/tarot/the-chariot.jpg", meaning: "Determination, willpower, success", score: 95 },
    { name: "Strength", image: "assets/tarot/strength.jpg", meaning: "Courage, strength, patience", score: 85 },
    { name: "The Hermit", image: "assets/tarot/the-hermit.jpg", meaning: "Introspection, solitude, guidance", score: 45 },
    { name: "Wheel of Fortune", image: "assets/tarot/wheel-of-fortune.jpg", meaning: "Luck, cycles, destiny", score: 95 },
    { name: "Justice", image: "assets/tarot/justice.jpg", meaning: "Fairness, truth, law", score: 70 },
    { name: "The Hanged Man", image: "assets/tarot/the-hanged-man.jpg", meaning: "Pause, surrender, letting go", score: 40 },
    { name: "Death", image: "assets/tarot/death.jpg", meaning: "Endings, transformation, change", score: 60 },
    { name: "Temperance", image: "assets/tarot/temperance.jpg", meaning: "Balance, moderation, patience", score: 85 },
    { name: "The Devil", image: "assets/tarot/the-devil.jpg", meaning: "Addiction, materialism, playfulness", score: 35 },
    { name: "The Tower", image: "assets/tarot/the-tower.jpg", meaning: "Upheaval, disaster, awakening", score: 25 },
    { name: "The Star", image: "assets/tarot/the-star.jpg", meaning: "Hope, inspiration, faith", score: 90 },
    { name: "The Moon", image: "assets/tarot/the-moon.jpg", meaning: "Illusion, intuition, uncertainty", score: 50 },
    { name: "The Sun", image: "assets/tarot/the-sun.jpg", meaning: "Success, vitality, positivity", score: 100 },
    { name: "Judgement", image: "assets/tarot/judgement.jpg", meaning: "Reflection, reckoning, awakening", score: 80 },
    { name: "The World", image: "assets/tarot/the-world.jpg", meaning: "Completion, wholeness, accomplishment", score: 95 }
];

function generateSeed(wallet, date) {
    const combined = wallet + date;
    let hash = 0;

    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }

    return Math.abs(hash);
}

function seededRandom(seed) {
    const modulus = 233280;
    const multiplier = 9301;
    const increment = 49297;
    seed = (seed * multiplier + increment) % modulus;
    return seed / modulus;
}

function drawThreeCards(walletAddress) {
    const overlay = document.getElementById('overlay');
    const predictionVideo = document.getElementById('prediction-video');
    const content = document.getElementById('content');

    overlay.style.display = 'block';
    predictionVideo.style.display = 'block';
    content.style.opacity = '0.5';

    predictionVideo.play();
    predictionVideo.onended = async () => {
        overlay.style.display = 'none';
        predictionVideo.style.display = 'none';
        content.style.opacity = '1';

        const seed = generateSeed(walletAddress, new Date().toISOString().split('T')[0]);
        const selectedCards = [];
        let currentSeed = seed;

        while (selectedCards.length < 3) {
            const randomIndex = Math.floor(seededRandom(currentSeed) * majorArcana.length);
            if (!selectedCards.includes(majorArcana[randomIndex])) {
                selectedCards.push(majorArcana[randomIndex]);
            }
            currentSeed++;
        }

        const allCards = document.querySelectorAll('.card img');
        const cardNames = document.querySelectorAll('.card-name');
        allCards.forEach((card, index) => {
            card.src = selectedCards[index].image;
            card.alt = selectedCards[index].name;
        });
        cardNames.forEach((name, index) => {
            name.textContent = selectedCards[index].name;
            name.style.display = "block";
        });

        const totalScore = selectedCards.reduce((sum, card) => sum + card.score, 0);
        const fortuneResult = document.getElementById('fortune-result');
        const fortuneScore = document.getElementById('fortune-score');
        const fortuneGrade = document.getElementById('fortune-grade');
        const fortuneAdvice = document.getElementById('fortune-advice');

        fortuneScore.textContent = totalScore;

        let grade, advice;
        if (totalScore >= 250) {
            grade = 'S';
            advice = "An extraordinary day for trading! Your fortune is at its peak, so take full advantage of the opportunities. Consider exploring new trading strategies or investing in promising projects. Stay disciplined and plan your moves carefully to maximize profits.";
        } else if (totalScore >= 220) {
            grade = 'A';
            advice = "A great day for strategic trading. Luck is on your side, so focus on high-potential trades or long-term investments. Diversify your portfolio slightly and use stop-loss orders to secure gains. Trust your instincts but remain cautious of market volatility.";
        } else if (totalScore >= 190) {
            grade = 'B';
            advice = "Moderate luck, trade carefully. Some trades may perform well while others may not. Focus on assets with strong fundamentals and avoid overly risky moves. Use this time to refine your strategies and rebalance your portfolio if needed.";
        } else if (totalScore >= 160) {
            grade = 'C';
            advice = "Caution advised; avoid risks. The market may be unpredictable for you today. Stick to safe investments or consider sitting out of trading to observe the market. Patience will be your best strategy at the moment.";
        } else if (totalScore >= 130) {
            grade = 'D';
            advice = "Consider switching wallets. Your fortune today suggests limited opportunities, and risks may outweigh rewards. Use this time to review your financial plans or research new strategies, but avoid significant decisions.";
        } else {
            grade = 'F';
            advice = "Avoid trading; switch wallets. This is not a favorable day for financial activities. Focus on learning and preparing for future opportunities rather than taking risks. Patience will bring better outcomes in the long run.";
        }        

        fortuneGrade.textContent = grade;
        fortuneAdvice.textContent = advice;
        fortuneResult.style.display = 'block';

        await displayBoostedTokens();
    };
}

async function displayBoostedTokens() {
    const boostedTokensDiv = document.getElementById('boosted-tokens');
    const boostedTokensHeader = document.getElementById('boosted-tokens-header');
    const boostedTokensList = document.getElementById('boosted-tokens-list');
    const loadingMessage = document.getElementById('loading-message');

    boostedTokensDiv.style.display = "block";
    loadingMessage.style.display = "block";
    boostedTokensHeader.style.display = "none";
    boostedTokensList.innerHTML = "";

    try {
        const response = await fetch('https://api.dexscreener.com/token-boosts/latest/v1');
        const tokens = await response.json();

        loadingMessage.style.display = "none";
        boostedTokensHeader.style.display = "block";

        tokens.slice(0, 10).forEach(token => {
            const tokenDiv = document.createElement('div');
            tokenDiv.className = 'token';
            tokenDiv.innerHTML = `
                <p><strong>Token:</strong> ${token.tokenAddress}</p>
                <p><strong>Chain:</strong> ${token.chainId}</p>
                <p><strong>Boosted Amount:</strong> $${token.amount.toLocaleString()}</p>
                <p><strong>Description:</strong> ${token.description || 'N/A'}</p>
                <a href="${token.url}" target="_blank">Go To DexScreener</a>
            `;
            boostedTokensList.appendChild(tokenDiv);
        });

        if (tokens.length === 0) {
            boostedTokensList.innerHTML = "<p>No boosted tokens available at the moment.</p>";
        }
    } catch (error) {
        console.error('Error fetching boosted tokens:', error);
        loadingMessage.textContent = "Failed to load tokens. Please try again later.";
    }
}

async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            const walletAddress = response.publicKey.toString();
            document.getElementById('wallet-info').style.display = 'block';
            document.getElementById('wallet-address').textContent = walletAddress;
            document.getElementById('draw-card').style.display = 'inline-block';
            return walletAddress;
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    } else {
        alert("Please install Phantom Wallet!");
    }
}

document.getElementById("connect-wallet").addEventListener("click", async () => {
    const walletAddress = await connectWallet();
    if (walletAddress) {
        document.getElementById("draw-card").addEventListener("click", () => {
            drawThreeCards(walletAddress);
        });
    }
});