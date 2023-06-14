
const prompt = require("prompt-sync")();

//Declaring the global variable over here
const ROWS = 3;
const COLS = 3;
const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}
const SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}
//Making the Function Deposit 
const deposit = () => {
    while (true){
        const depositAmount = prompt("Enter a deposit amount:  ");
        const numberdepositAmount = parseFloat(depositAmount);

        if(isNaN(numberdepositAmount) || numberdepositAmount <=0){
           console.log("Invalid deposit amount, TRY AGAIN!!");
        }
        else{
           return numberdepositAmount;
        }
    }
    

};

//Making the Number of lines on which user wants to bet on
const getNumberOfLines = () => {
    while (true){
        const lines = prompt("Enter the number of lines to bet on (1-3):  ");
        const NumberOfLines = parseFloat(lines);

        if(isNaN(NumberOfLines) || NumberOfLines<=0 || NumberOfLines >3){
            console.log("Invalid number of line, TRY AGAIN!!!");
            
        }
        else{
            return NumberOfLines;
        }
    }

};

//Making the getBet to check that user have enough balance to bet
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the total bet per lines:  ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet<=0 || numberBet > (balance / lines)){
            console.log("Invalid bet, TRY AGAIN!!!");
        }
        else{
            return numberBet;
        }
    }
};

//Making the Spin 
const spin = () => {
    const symbols = [];
    for(const[symbol, count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j =0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);

        }
    }
    return reels;
};

//Making the transpoe to return the no. of rows.
const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};


//Printing the symbols in a row
const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const[i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};


//Giving the PLayers their winning if they won any
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet*SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
};


//Making the balance function to update after every game, and providing a play again option
const game = () => {
    let balance = deposit();

    while (true){
        console.log("You have a balance of $", +balance);
        const NumberOfLines = getNumberOfLines();
        const bet = getBet(balance, NumberOfLines);
        balance -= bet * NumberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, NumberOfLines);
        balance += winnings;
        console.log("You won, $", +winnings.toString());

        if(balance <=0){
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n) ? ");

        if(playAgain != "y")break;
    }
}

game();
//Slot-Machine completed
