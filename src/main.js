import * as TextPrinter from "./animations/text_print.js";
import { idMasterList } from "./randomiser/id_list.js";
import { Sinners } from "./id_definitions/sinners.js";


const testOutput = document.getElementById("print-master-list");
testOutput.onclick = function() { 
    displayTeamPrescript();
};

function displayTeamPrescript(){
    const ids  = idMasterList.filter(id => id.sinner === Sinners.Ryoshu || id.factions.includes(["LCB", "Fixer"]));
    ids.print();
    let printer = new TextPrinter.UnscramblePrinter("text-animation-test-1", ids.getRandom().getName());
    printer.print();
    printer = new TextPrinter.UnscramblePrinter("text-animation-test-2", ids.getRandom().getName());
    printer.print();
}

