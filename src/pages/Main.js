
function Main(){
    const skills = [
        {
            id: 1,
            lesson: 'HTML',
            percent: '70'
        },
        {
            id: 2,
            lesson: 'CSS',
            percent: '60'
        },
        {
            id: 3,
            lesson: 'JavaScript',
            percent: '20'
        },
        {
            id: 3,
            lesson: 'React',
            percent: '20'
        },
        {
            id: 5,
            lesson: 'Adobe Photoshop',
            percent: '70'
        },
        {
            id: 6,
            lesson: 'Adobe Illustrator',
            percent: '70'
        },
        {
            id: 7,
            lesson: 'Corel Draw',
            percent: '50'
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
                    <span>{item.percent + '%' + ' ' + item.lesson }</span>
                )}

            </div>
        </div>
    </div>    
    </main>
        </>
    );
}

export default Main
