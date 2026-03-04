function calculateStability() {
    // 1. Grab the values
    const incomeVal = document.getElementById('income').value;
    const rentVal = document.getElementById('rent').value;
    const refundVal = document.getElementById('refund').value;

    // 2. Validation: Don't run the math if boxes are empty
    if (!incomeVal || !rentVal || !refundVal) {
        document.getElementById('results').innerHTML = 
            `<p style="color: #d32f2f; font-weight: bold;">Please enter all values to see your analysis.</p>`;
        return;
    }

    const income = parseFloat(incomeVal);
    const rent = parseFloat(rentVal);
    const refund = parseFloat(refundVal);

    // 3. CORE Logic (Benchmark: $10,000/mo)
    const benchmark = 10000; 
    const gap = benchmark - income;
    const rentStability = rent > 0 ? (refund / rent).toFixed(1) : 0;

    // Calculate what % of the goal they are currently meeting
    const percentageMet = ((income / benchmark) * 100).toFixed(0);

    // Ensure the percentage doesn't go above 100% or below 0%
    let displayPercent = Math.min(Math.max(percentageMet, 0), 100);
    
    // 3. Conditional Color Logic
    let barColor = "#d32f2f"; // Red
    if (percentageMet >= 80) barColor = "#2e7d32"; // Green
    else if (percentageMet >= 50) barColor = "#f9a825"; // Yellow

    // 4. Professional Output
    document.getElementById('results').innerHTML = `
        <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px; border-left: 5px solid #003366;">
            <p><strong>Monthly Gap to Self-Sufficiency:</strong> $${gap.toLocaleString()}</p>
            <p><strong>Sufficiency Level:</strong> ${percentageMet}% of the Snohomish County Goal</p>

            <div style="background-color: #d1d5db; border-radius: 10px; height: 20px; width: 100%; margin: 10px 0;">
                <div id="progress-fill" style="background-color: ${barColor}; height: 100%; border-radius: 10px; width: ${displayPercent}%; transition: width 1s ease-in-out;">
                </div>
            </div>

            <p><strong>Housing Security:</strong> Your VITA refund covers <span style="color: #003366; font-size: 1.2rem; font-weight: bold;">${rentStability}</span> months of rent.</p>  
            
            <button onclick="window.print()" style="margin-top: 15px; background-color: #666; font-size: 0.8rem;">
                🖨️ Save/Print Stability Plan
            </button>
        </div>
    `;
}