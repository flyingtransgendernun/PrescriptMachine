import {Sinners} from '../id_definitions/sinners.js'; 
import { SinnerId } from '../id_definitions/sinner_id.js';
import * as random from '../../lib/random.js';

export class IdList extends Array{
    // take json as input and parse all the IDs from that

    // return a list of all ids that match the predicatez
    filter(predicate){
        let out = new IdList();
        this.forEach(id => {
            //console.log(`Trying ${id.toString()}\n`);
            let result = predicate(id);
            //console.log(result);
            if(result === true){
                out.push(id);
            } 
        });
        console.log(`${out.length} IDs found that match the filter`);
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
        if(this.length < 0) return null;
        const idx = random.randomInt(this.length) - 1;
        return this[idx];
    }
}
export let idMasterList = new IdList();