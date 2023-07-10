import "./contact.css";

const Contact = () => {
  return (
    <>
    <h2>Контакти та користні посилання</h2>

      <div className="container-contact">

      <a className="a-link" href="https://fitm.kubg.edu.ua/">
      <div className="card-contact">
          <header className="header-contact">
            <h3>Факультет інформаційних технологій та математики</h3>
          </header>
          <div className="content-contact">
            <p>Київський університет імені Бориса Грінченка</p>
            <hr />
            <p>Факультет інформаційних технологій та математики</p>
            <br />
          </div>
        </div>
      </a>
      
      <a className="a-link" href="https://markdown.rozh2sch.org.ua/">
      <div className="card-contact">
          <header className="header-contact">
            <h3>Путівник по Markdown</h3>
          </header>
          <div className="content-contact">
            <p>Мова розмітки даних</p>
            <hr />
            <p>У даному керівництві ви познайомитесь з Markdown</p>
            <br />
          </div>
        </div>
      </a>
      </div>
    </>
  );
};

export default Contact;
