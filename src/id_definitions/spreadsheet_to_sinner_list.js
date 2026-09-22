import { idMasterList } from './id_list.js';
import { SinnerId } from './sinner_id.js';
import { Sinners } from './sinners.js';
import { splitCommaSeperatedValue } from '../main.js';

const fileUpload = document.getElementById("spreadsheet-upload");
fileUpload.addEventListener("change", convertToIdList)

async function convertToIdList(){
    const file = this.files[0];
    console.log(`${file.name} uploaded`);
    loadFile(file);
}

export async function loadFile(file){
    if(file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        window.alert("Not a valid excel spreadsheet");
        return;
    }

    const XLSX = await import("https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs");
    const reader = new FileReader();
    reader.onload = async (e) => {
    const arrayBuffer = e.target.result;
    const workbook = XLSX.read(arrayBuffer);
    const sheetname = workbook.SheetNames[0];
    console.log(`${sheetname} found`);
    const idSheet = workbook.Sheets[sheetname];
    const data = XLSX.utils.sheet_to_json(idSheet, {header : 1})
    let parsedIdList = await parseIdDataFromJson(data);
    // if the result is not null, undefined or empty, then make it the global master list
    if(parsedIdList === null || parsedIdList === undefined || parsedIdList.length == 0){
        window.alert("Failed to load sinners from XLSX file");
    }
    else{
        idMasterList.splice(0, idMasterList.length);
        parsedIdList.forEach(id => {
            idMasterList.push(id);
        });
        localStorage.setItem("masterList", idMasterList);
    }
    }
    reader.readAsArrayBuffer(file);
}

class ColumnNames{
    static Sinner = "Sinner";
    static IdName = "ID Name";
    static Stars = "Stars";
    static Level = "Level";
    static Statuses = "Status";
    static Factions = "Faction";
    static Season = "Season";
    static Difficulty = "Difficulty";
    static Available = "Available";
    static Required = [this.Sinner, this.IdName, this.Stars, this.Statuses, this.Factions, this.Season, this.Available];
    static Optional = [this.Level, this.Difficulty]
    static All = this.Required.concat(this.Optional);
}

function getColumnIndices(headerRow){
    const colIdxMap = new Map();
    for(let i = 0; i < ColumnNames.All.length; ++i){
        const columnName = ColumnNames.All[i];
        const index = headerRow.indexOf(columnName);
        //if column couldnt be found and its a required column, break
        if(index < 0 && ColumnNames.Required.includes(columnName)){
            const msg = "Loaded Sheet Invalid (Required Column '" + columnName + "' could not be found)";
            console.log(msg);
            window.alert(msg);
            return null;
        }
        colIdxMap.set(columnName, index);
    }
        
    console.log(colIdxMap);
    
    return colIdxMap;
}

function parseIdDataFromJson(data){
    let newMasterList = [];
    const headerRow = data[0];
    const colIdxMap = getColumnIndices(headerRow);
    if(colIdxMap === null){
        return newMasterList;
    }
    // start at 1 because row 0 is header
    for (let rowNum = 1; rowNum < data.length; rowNum++){
        try{
            const row = data[rowNum];
            const sinner = Sinners.All[row[colIdxMap.get(ColumnNames.Sinner)] - 1];
            //console.log(sinner.toString());
            const name = row[colIdxMap.get(ColumnNames.IdName)];
            const stars = parseInt(row[colIdxMap.get(ColumnNames.Stars)]);
            const statuses = splitCommaSeperatedValue(row[colIdxMap.get(ColumnNames.Statuses)], true);
            const factions = splitCommaSeperatedValue(row[colIdxMap.get(ColumnNames.Factions)], true);
            const season = parseInt(row[colIdxMap.get(ColumnNames.Season)]);
            const level = parseInt(row[colIdxMap.get(ColumnNames.Level)]);
            const difficulty = parseInt(row[colIdxMap.get(ColumnNames.Difficulty)]);
            const available = Boolean(parseInt(row[colIdxMap.get(ColumnNames.Available)]));
            let newId = new SinnerId(
                sinner,
                name,
                stars,
                season,
                statuses,
                factions,
                (isNaN(level)) ? SinnerId.MaxLevel : level,
                (isNaN(difficulty)) ? 0 : difficulty,
                available
            );
            newMasterList.push(newId);

        }
        catch (error){
            console.log(`Row ${rowNum} could not be parsed (${error})`);
            continue;
        }
    }
    console.log(`${newMasterList.length} found`);
    return newMasterList;
}