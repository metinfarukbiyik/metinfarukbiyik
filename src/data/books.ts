export interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

interface BookCollection {
  read: Book[]; // Okunan kitaplar
  toRead: Book[]; // Okunacak kitaplar
}

export const booksData: BookCollection = {
  read: [
    {
      id: 1,
      title: "Bozkurtlar",
      author: "Hüseyin Nihal Atsız",
      image: "/images/books/bozkurtlar.jpg"
    },
    {
      id: 2,
      title: "Deli Kurt",
      author: "Hüseyin Nihal Atsız",
      image: "/images/books/delikurt.jpg"
    },
    {
        id: 3,
        title: "Doğu Batı Arasındaki İslam",
        author: "Aliya İzzetbegoviç",
        image: "/images/books/dogubati.jpg"
      },
      {
        id: 4,
        title: "Elveda Gülsarı",
        author: "Cengiz Aytmatov",
        image: "/images/books/elvedagulsari.jpg"
      },
      {
        id: 5,
        title: "Mabetsiz Şehir",
        author: "Osman Yüksel Serdengeçti",
        image: "/images/books/mabetsizsehir.jpg"
      },
      {
        id: 6,
        title: "Bir Nesli Nasıl Mahvettiler",
        author: "Osman Yüksel Serdengeçti",
        image: "/images/books/nasilmahvettiler.jpg"
      }
  ],
  toRead: [
    {
      id: 1,
      title: "İnsan Neyle Yaşar",
      author: "Lev Tolstoy",
      image: "/images/books/insanneyleyasar.jpg"
    },
    {
        id: 2,
        title: "Bir Adam Yaratmak",
        author: "Necip Fazıl Kısakürek",
        image: "/images/books/biradamyaratmak.jpg"
      }
  ]
}; 