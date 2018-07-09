import { AltFormatDetail } from "./alt-format-detail.model";
import { PreferredFileFormat } from "./preferred-file-format.model";

export class AltMediaRequest {

    /*

    {
  "formKey": "-LC2QWwoUdpqCOAgJLVW",
  "form": {
    "created": 1525844680588,
    "edited": false,
    "form": {
      "altFormatDetail": [
        {
          "bookTitleAndAuthor": "a book",
          "courseTitleAndSection": "a course",
          "edition": "1",
          "isbn": "random"
        }
      ],
      "cellPhone": "some phone",
      "collegeId": "some id",
      "email": "some email",
      "fullName": "some name",
      "preferredFileFormat": {
        "audio": true,
        "braillePaper": "",
        "kurzWeilFirefly": true,
        "largePrint": "",
        "learningAlly": true,
        "msWord": "",
        "pdf": ""
      },
      "signature": "my sig"
    },
    "formName": "altMediaRequest",
    "lastMod": 1525844680588,
    "user": "nobody"
  },
  "item": {
    "_isScalar": false,
    "source": {
      "_isScalar": false
    },
    "operator": {}
  }
}

    */
    fullName: string;
    collegeId: string;
    cellPhone?: string;
    email?: string;
    altFormatDetail: AltFormatDetail[];
    preferredFileFormat: PreferredFileFormat;
    signature: string;


    constructor(options: {
        fullName: string,
        collegeId: string,
        cellPhone?: string,
        email?: string,
        altFormatDetail: AltFormatDetail[],
        preferredFileFormat: PreferredFileFormat,
        signature: string,
    })
    {
        this.fullName = options.fullName;
        this.collegeId = options.collegeId ;
        this.cellPhone = options.cellPhone ;
        this.email = options.email;
        this.altFormatDetail = options.altFormatDetail || [];
        this.preferredFileFormat = options.preferredFileFormat;
        this.signature = options.signature;
    }

}
