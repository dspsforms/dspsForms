
/*
 "preferredFileFormat": {
        "audio": true,
        "braillePaper": "",
        "kurzWeilFirefly": true,
        "largePrint": "",
        "learningAlly": true,
        "msWord": "",
        "pdf": ""
      },
*/

export class PreferredFileFormat {

    kurzWeilFirefly?: boolean;
    msWord?: boolean;
    pdf?: boolean;
    learningAlly?: boolean;
    audio?: boolean;
    braillePaper?: boolean;
    largePrint?: boolean;
    

    constructor(options: {
        kurzWeilFirefly?: boolean,
        msWord?: boolean,
        pdf?: boolean,
        learningAlly?: boolean,
        audio?: boolean,
        braillePaper?: boolean,
        largePrint?: boolean,
    })
    {
        this.kurzWeilFirefly = options.kurzWeilFirefly;
        this.msWord = options.msWord;
        this.pdf = options.pdf ;
        this.learningAlly = options.learningAlly;
        this.audio = options.audio;
        this.braillePaper = options.braillePaper;
        this.largePrint = options.largePrint;
        
    }
}