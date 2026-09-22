import {Sinners} from './sinners.js'; 
import * as random from '../../lib/random.js';
import {Team} from './team.js';

export class IdList extends Array{
    // take json as input and parse all the IDs from that

    // return a list of all ids that match the predicatez
    filter(predicate){
        console.log(predicate);
        let out = new IdList();
        this.forEach(id => {
            if(predicate(id)){
                out.push(id);
            } 
        });
        //console.log(`${out.length} IDs found that match the filter`);
        return out;
    }

    getIdsForSinner(sinnerToSearchFor){
        return this.filter(id => id.sinner === sinnerToSearchFor);
    }

    print(){
        console.log("Trying to print master list");
        const testOutput = document.getElementById("master-list-test-output");
        testOutput.innerHTML = "";
        this.forEach(id => {
            let listItem = document.createElement("li");
            listItem.setAttribute('class', 'test-output-item');
            testOutput.appendChild(listItem);
            listItem.innerHTML += `<li>${id.toString()}</li>`;
        });
    }

    getRandom(){
        if(this.length < 1) return null;
        const idx = random.randomInt(this.length);
        return this[idx];
    }

    getRandomTeamWithoutFilter(){
        const newTeam = new Team();
        for(let i = 0; i < Sinners.All.length; i++){
            const sinner = Sinners.All[i];
            const sinnersIds = this.getIdsForSinner(sinner);
            if(sinnersIds.length < 1){
                console.log(`Couldn't find an ID for ${sinner.name}`);
                continue;
            }

            newTeam.push(sinnersIds.getRandom());
        }
        return newTeam;
    }

    getRandomTeam(filters){
        const newTeam = new Team();
        const filter = ((id) => id.keywordsIncludesAnyOf(filters));
        const filteredIdList = (filters.length > 0) ? this.filter(filter) : this;

        for(let i = 0; i < Sinners.All.length; i++){
            const sinner = Sinners.All[i];
            const sinnersIds = filteredIdList.getIdsForSinner(sinner);
            if(sinnersIds.length < 1){
                console.log(`Couldn't find an ID for ${sinner.name}`);
                continue;
            }
            console.log(sinnersIds);
            const newId = sinnersIds.getRandom();
            newTeam.push(newId);
            console.log(newId);
        }
        return newTeam;
    }

    getRandomStatusTeam(){
        const statuses = new Set()
        this.forEach(id => {
            id.statuses.forEach(s => statuses.add(s));
        })
        return this.createRandomTeamFromKeywordSet(statuses);
    }

    getRandomFactionTeam(){
        const factions = new Set()
        this.forEach(id => {
            id.factions.forEach(f => factions.add(f));
        })
        return this.createRandomTeamFromKeywordSet(factions);
    }

    createRandomTeamFromKeywordSet(set){
        const keywords = Array.from(set);
        const randKw = keywords[random.randomInt(keywords.length)];
        console.log(`Creating ${randKw} team`);
        return this.getRandomTeam([randKw]);
    }
}

export let idMasterList = new IdList();