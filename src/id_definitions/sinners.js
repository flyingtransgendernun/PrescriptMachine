class Sinner{
    constructor(id, name, img){
        this.id = id;
        this.name = name;
        this.img = img;
    }

    toString(){
        return `Sinner #${this.id} (${this.name})`;
    }
}

export class Sinners{
    static YiSang = new Sinner(1, "Yi Sang", "https://limbuscompany.wiki.gg/wiki/Yi_Sang/Gallery#/media/File:Yi_Sang_Icon.png");
    static Faust = new Sinner(2, "Faust", "https://limbuscompany.wiki.gg/wiki/Faust/Gallery#/media/File:Faust_Icon.png");
    static DonQuixote = new Sinner(3, "Don Quixote", "https://limbuscompany.wiki.gg/wiki/Don_Quixote/Gallery#/media/File:Don_Quixote_Icon.png");
    static Ryoshu = new Sinner(4, "Ryōshū", "https://limbuscompany.wiki.gg/wiki/Ry%C5%8Dsh%C5%AB/Gallery#/media/File:Ryoshu_Icon.png");
    static Meursault = new Sinner(5, "Meursault", "https://limbuscompany.wiki.gg/wiki/Meursault/Gallery#/media/File:Meursault_Icon.png");
    static HongLu = new Sinner(6, "Hong Lu", "https://limbuscompany.wiki.gg/wiki/Hong_Lu/Gallery#/media/File:Hong_Lu_Icon.png");
    static Heathcliff = new Sinner(7, "Heathcliff", "https://limbuscompany.wiki.gg/wiki/Heathcliff/Gallery#/media/File:Heathcliff_Icon.png");
    static Ishamel = new Sinner(8, "Ishmael", "https://limbuscompany.wiki.gg/wiki/Ishmael/Gallery#/media/File:Ishmael_Icon.png");
    static Rodion = new Sinner(9, "Rodion", "https://limbuscompany.wiki.gg/wiki/Rodion/Gallery#/media/File:Rodion_Icon.png");
    // dante is unplayable but they are sinner number 10
    static Dante = new Sinner(10, "Dante", "https://limbuscompany.fandom.com/wiki/Dante/Gallery?file=AnnouncerDante.png#Assets")
    static Sinclair = new Sinner(11, "Sinclair", "https://limbuscompany.wiki.gg/wiki/Sinclair/Gallery#/media/File:Sinclair_Icon.png");
    static Outis = new Sinner(12, "Outis", "https://limbuscompany.wiki.gg/wiki/Outis/Gallery#/media/File:Outis_Icon.png");
    static Gregor = new Sinner(13, "Gregor", "https://limbuscompany.wiki.gg/wiki/Gregor/Gallery#/media/File:Gregor_Icon.png");
    // dante has no ids but is included so the array is easier to  search
    static All = [this.YiSang, this.Faust, this.DonQuixote, this.Ryoshu, this.Meursault, 
        this.HongLu, this.Heathcliff, this.Ishamel, this.Rodion, this.Dante, this.Sinclair, this.Outis, this.Gregor];

    static toString(){
        let out = "";
        this.All.forEach(sinner => {
            out += sinner.toString() + "\n";
        });
        return out;
    }

    static getSinnerFromIdNumber(id){
        // -1 because 0 based indexing means that hong lu is index 0 despite his id being 1
        return this.All[id - 1];
    }
}