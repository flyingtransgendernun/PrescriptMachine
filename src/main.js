import { idMasterList } from "./id_definitions/id_list.js";

const randomTeamBtn = document.getElementById("random-team");
const randomStsTeamBtn = document.getElementById("random-status-team");
const randomFacTeamBtn = document.getElementById("random-faction-team");
const randomDeploy = document.getElementById("random-deployment-order");
const keywordFilterBox = document.getElementById("keywords-filter");
let team = null;

randomTeamBtn.onclick = function() { 
    if(idMasterList == null || idMasterList == undefined || idMasterList.length < 1){
        window.alert("Please load a spreadsheet with ID data");
        return;
    }
    const keywordsToFilter = getKeywords();
    let s = idMasterList[0];
    team = idMasterList.getRandomTeam(keywordsToFilter);
    team.displayTeamPrescript("team-output");
};

randomStsTeamBtn.onclick = function() { 
    if(idMasterList == null || idMasterList == undefined || idMasterList.length < 1){
        window.alert("Please load a spreadsheet with ID data");
        return;
    }
    team = idMasterList.getRandomStatusTeam();
    team.displayTeamPrescript("team-output");
};

randomFacTeamBtn.onclick = function() { 
    if(idMasterList == null || idMasterList == undefined || idMasterList.length < 1){
        window.alert("Please load a spreadsheet with ID data");
        return;
    }
    team = idMasterList.getRandomFactionTeam();
    team.displayTeamPrescript("team-output");
};

randomDeploy.onclick = function() { 
    if(team == null || team.length != 12){
        window.alert("There is not a full team to select the order for");
    }
    team.setRandomDeploymentOrder("team-output");
};

function getKeywords(){
    const keywordArray = splitCommaSeperatedValue(keywordFilterBox.value, true);
    return keywordArray;
}

export function splitCommaSeperatedValue(strValue, forceLower = false){
    const out = (strValue) ? Papa.parse(strValue).data[0] : [];
    if(forceLower){
        let loweredOut = [];
        out.forEach(element => {
            loweredOut.push(element.toLowerCase())
        });
        return loweredOut;
    }
    else{
        return out;
    }
}