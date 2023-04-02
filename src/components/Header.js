import {facebook, instagram, twitter, github, linkedin} from './Icons'

function Header() {
  return (
    <div>
        
        <header>
        <div className="profile">
            <div className="container">
                <div className="author">
                    <h4>Metin Faruk <b>Bıyık</b> </h4>
                    <p>HTML/CSS & JavaScript. </p>
                    <nav className="social">
                        <ul>
                            <a href="https://www.facebook.com/metinbiyik" target='_blank' rel='noreferrer'>
                                <li id="fa">{facebook}</li>
                            </a>
                            <a href="https://www.linkedin.com/in/metinbiyik/" target='_blank' rel='noreferrer'>
                                <li id="li">{linkedin}</li>
                            </a>
                            <a href="https://twitter.com/_metinbiyik" target='_blank' rel='noreferrer'>
                                <li id="tw">{twitter}</li>
                            </a>
                            <a href="https://instagram.com/_metinbiyik" target='_blank' rel='noreferrer'>
                                <li id="ig">{instagram}</li>
                            </a>
                            <a href="https://github.com/metinfarukbiyik" target='_blank' rel='noreferrer'>
                                <li id="gh">{github}</li>
                            </a>
                            
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>

    </div>
  );
}

export default Header