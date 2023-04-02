
function Main(){
    const skills = [
        {
            id: 1,
            lesson: 'HTML',
        },
        {
            id: 2,
            lesson: 'CSS',
        },
        {
            id: 3,
            lesson: 'JavaScript',
            slug: 'js',
        },
        {
            id: 3,
            lesson: 'React',
        },
        {
            id: 5,
            lesson: 'Adobe Photoshop',
        },
        {
            id: 6,
            lesson: 'Adobe Illustrator',
        },
        {
            id: 7,
            lesson: 'Corel Draw',
        }
    ]
    return(
        <>
        <main>
        <div className="container">
        <div className="desc">
                    <div className="biyo">
                        <h4>Hakkımda / <b>About</b> 👨🏻‍💻</h4> 
                        <p>
                        Merhaba! 22 Nisan Trabzon doğumluyum. 24 Yaşındayım. ATA AÖF Bilgi Yönetimi öğrencisiyim. Front-End Developer olma yolunda kendimi geliştirmek üzere adımlar atıyorum. HTML/CSS ve JS dersleri ile bilgimin üzerine yeni bilgiler katarak, kişisel web sayfamda uyguluyorum. Her gün farklı şeyler öğrenerek hem kendimi hem de bu sayfayı güncellemiş oluyorum.
                        </p>
                    
                </div>
            </div>
            <div className="skills">
                <h4>Becerilerim / <b>My Skills</b> 🎨</h4>
                <div className="myskill">
                <p>
                    Öğrendiğim ve kendimi geliştirmeye devam ettiğim yazılım dillerini ve grafik programlarını aşağıdaki gibi hemen hemen yakın olan değerler ile yüzdelendirdim. Yakın zamanda bu sayfaya öğrendiğim diğer dilleri de ekleyerek daha geniş bir portföy oluşturacağım.
                </p>
                {skills.map(item =>
                    <span>{item.lesson}</span>
                )}

            </div>
        </div>
    </div>    
    </main>
        </>
    );
}

export default Main