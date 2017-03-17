/*
 Libraries Start
*/

/*!
 * CallWithName v1.0
 *
 * Copyright 2017, Himanshu Tanwar
 * Released under the MIT license
 * https://github.com/webXtended/callWithName
 * Date: 2017-03-16
 */
var callWithName=function(t,n,o){var i,a,e=typeof t,s=typeof n;o=o||{},"string"===e&&"function"===s?(i=o.context||window,i[t]=n,i[t].toString=function(){var t=n.call(i);return t||o.returnValue||void 0}):(a=[],a.push("cannot assign"),a.push(e),a.push("to a"),a.push(s),console.error(a.join(" ")),console.info("Pass a string for name and a function to associate it with the name"),console.info("for more details visit https://github.com/webXtended/callWithName"))};
/*
 Libraries End
*/


/*!
 * Copyright 2017, Anusha Balodi
 * Released under the MIT license
 * https://github.com/AnushaBalodi/connect4-console
 * Date: 2017-03-17
 */

var mainObj = [],
    currentPos,
    currentPlayer,
    time = 200,
    stackSize = 6;

function init() {
    mainObj = [];
    for(var i =0; i<7; i++) {
        mainObj.push(new Array(stackSize).fill(' '));
    }
    currentPos = new Array(7).fill(0);
    currentPlayer = 'X';
    console.clear();
    printPlayer();
    plotPos();
}

function display(str, style) {
    console.log("%c"+str, style);
}

function plotPos() {
    var logit = '\n%c+---+---+---+---+---+---+---+\n';
    var style = [];
    var boardColor = "color:" + (currentPlayer === 'X' ? 'blue' : 'red');
    style.push(boardColor);
    for(var i=stackSize-1; i>=0; i--) {
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
    logit+='  a   b   c   d   e   f   g ' + '\n';
    // display(logit);
    style.unshift(logit);
    console.log.apply(null,style);
}

function playAt(stack) {
    if(stack < 1 || stack > 7) {
        display("Kindly enter correct stack(1-7)!!", "color:#a94442;font-size:13px;background:#f2dede;");
        return;
    }

    if(currentPos[stack-1] === stackSize) {
        display("Stack already full!! Kindly choose another stack.", "color:#a94442;font-size:13px;background:#f2dede;");
        return;
    }

    var currPos = currentPos[stack-1], position = stackSize;

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

['a','b','c','d','e','f','g'].forEach(function(item, index){
    callWithName(item, function(){
        playAt(index+1);
    })
});



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

