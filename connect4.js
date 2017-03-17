var mainObj = [],
    currentPos = new Array(7).fill(0),
    currentPlayer = 'X',
    time = 200;

function init() {
    mainObj = [];
    for(var i =0; i<7; i++) {
        mainObj.push(new Array(7).fill(' '));
    }
    plotPos();
    printPlayer();
}

function display(str, style) {
    console.log("%c"+str, style);
}

function plotPos() {
    var logit = '\n%c+---+---+---+---+---+---+---+\n';
    var style = [];
    var boardColor = "color:" + (currentPlayer === 'X' ? 'blue' : 'red');
    style.push(boardColor);
    for(var i=6; i>=0; i--) {
        logit += '%c|';
        style.push(boardColor);
        for(var j=0; j<7; j++) {
            logit = "" + logit + "" + ("%c " +mainObj[j][i]) + ' %c|';
            if(mainObj[j][i] === 'X'){
                style.push("background:blue;color:blue;display:block");
            }else if(mainObj[j][i] === 'O'){
                style.push("background:red;color:red;display:block");
            }
            else{
                style.push("background:white;");
            }
            style.push(boardColor);
        }
        logit+='\n' + '+---+---+---+---+---+---+---+\n';

    }
    logit+='  1   2   3   4   5   6   7 ' + '\n';
    // display(logit);
    style.unshift(logit);
    console.log.apply(null,style);
}

function playAt(stack) {
    if(stack < 1 || stack > 7) {
        display("Kindly enter correct stack(1-7)!!", "color:#a94442;font-size:13px;background:#f2dede;");
        return;
    }

    var currPos = currentPos[stack-1], position = 7;

    function showThePlot() {
        console.clear();
        position--;
        loopPlot();
        plotPos();
    }

    function loopPlot() {
        if(position >= currPos) {
            setTimeout(function() {
                if(position < 6) {
                    mainObj[stack-1][position+1] = ' ';
                }
                mainObj[stack-1][position] = currentPlayer;
                showThePlot();
            }, time);
        } else {
            currentPos[stack-1] = currPos+1;
            togglePlayer();
        }
    }

    showThePlot();

}


function togglePlayer() {
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    printPlayer();
//    display('Its your turn ' + currentPlayer);
}
function printPlayer() {
    if(currentPlayer === 'X'){
        console.log("Its your turn %cX ", "color:blue;background:blue");
    }else{
        console.log("Its your turn %cO ", "color:red;background:red");
    }
}
init();
