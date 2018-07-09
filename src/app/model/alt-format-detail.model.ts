/*
"altFormatDetail": [
        {
          "bookTitleAndAuthor": "a book",
          "courseTitleAndSection": "a course",
          "edition": "1",
          "isbn": "random"
        }
      ]

i.e., AltFormatDetail[]
*/

export class AltFormatDetail {

    bookTitleAndAuthor: string;
    courseTitleAndSection: string;
    edition?: string;
    isbn?: string;

    constructor(options: {
        bookTitleAndAuthor: string,
        courseTitleAndSection: string,
        edition?: string,
        isbn?: string,
    })
    {
        this.bookTitleAndAuthor = options.bookTitleAndAuthor;
        this.courseTitleAndSection = options.courseTitleAndSection;
        this.edition = options.edition ;
        this.isbn = options.isbn;

    }
}
