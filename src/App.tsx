import { useEffect, useRef, useState } from 'react';
import './app.css';

const characters = [
  { name: 'Одинадцята', actor: 'Міллі Боббі Браун', role: 'Дівчинка з надздібностями', description: 'Втікач з лабораторії Гокінс. Має телекінез і ментальні здібності. Шукає справжню родину та свободу.', image: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=600', color: '#00fff5', tag: 'Головний герой', fullDescription: "Одинадцята (Джейн Хопер) — дівчинка, яка виросла в ізоляції в таємній урядовій лабораторії. Доктор Бреннер, якого вона називала «татом», проводив над нею жорстокі експерименти, щоб розвинути її надздібності. Вона може рухати предмети силою думки та чути думки інших. Після втечі з лабораторії вона знаходить справжніх друзів та родину. Її справжнє ім'я — Джейн Айвс, пізніше Хопер." },
  { name: 'Майк Вілер', actor: 'Фінн Вулфард', role: 'Лідер банди', description: 'Найближчий друг зниклого Вілла. Сміливий, вірний і першим зустрічає Одинадцяту в лісі.', image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600', color: '#e50914', tag: 'Головний герой', fullDescription: "Майк Вілер — природжений лідер і найкращий друг Вілла Байєрса. Коли Вілл зникає, саме Майк організовує пошуки та першим знаходить Одинадцяту. Він закохується в неї та ніколи не припиняє боротьбу за своїх друзів. Майк — серце банди, той хто об'єднує всіх разом навіть у найскрутніші часи." },
  { name: 'Вілл Байєрс', actor: 'Ноа Шнапп', role: 'Зниклий хлопчик', description: "Першим потрапляє у Перевернутий Світ. Чутливий, творчий та нескінченно прив'язаний до своїх друзів.", image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600', color: '#e50914', tag: 'Головний герой', fullDescription: "Вілл Байєрс — тихий, творчий хлопчик, якого ховали у Перевернутому Світі цілий рік. Після повернення він все ще відчуває зв'язок з темрявою — Mind Flayer використовує його як маріонетку. Вілл малює, грає в D&D і понад усе цінує дружбу. Його досвід у Перевернутому Світі назавжди змінив його, але не зламав." },
  { name: 'Джим Гоппер', actor: 'Девід Гарбор', role: 'Шериф Гокінса', description: 'Досвідчений поліцейський з болісним минулим. Стає батьківською фігурою для Одинадцятої.', image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600', color: '#f59e0b', tag: 'Ключовий персонаж', fullDescription: "Джим Гоппер — шериф Гокінса з трагічним минулим: він втратив доньку Сару від раку. Спочатку цинічний і байдужий, він повертається до життя завдяки Одинадцятій, яку усиновлює. Гоппер — захисник і боєць. Його любов до Джойс Байєрс та батьківські почуття до Одинадцятої роблять його одним з найглибших персонажів серіалу." },
  { name: 'Дастін Гендерсон', actor: 'Ґатен Матараццо', role: 'Серце банди', description: 'Веселий, розумний і завжди оптимістичний. Саме він першим здружується з Демо-псом Дартом.', image: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=600', color: '#00fff5', tag: 'Головний герой', fullDescription: "Дастін Гендерсон — найвеселіший та найоптимістичніший член банди. Він генетично обдарований природною цікавістю і любов'ю до науки. Саме він намагався приручити Дарта — дитинча демогоргона. Дастін також встановив радіозв'язок з Семі, дівчиною зі свого табору, яка стає його першою справжньою любов'ю." },
  { name: 'Люкас Сінклер', actor: 'Калеб МакЛафлін', role: 'Скептик та стратег', description: 'Практичний і обережний член банди. Спочатку не довіряє Одинадцятій, але стає одним з її найкращих друзів.', image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600', color: '#e50914', tag: 'Головний герой', fullDescription: "Люкас Сінклер — найобережніший і найраціональніший з банди. Він завжди сумнівається перш ніж довіритись комусь, тому спочатку боїться Одинадцятої. Але коли вона доводить свою вірність, він стає її надійним захисником. У четвертому сезоні Люкас потрапляє в небезпечне протистояння з бандою Джейсона." },
];

const seasons = [
  { number: 1, title: 'Перевернутий Світ', year: 2016, episodes: 8, rating: 8.7, image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Вілл Байєрс зникає. Його мати, Джойс, та місцевий шериф Гоппер починають розслідування. Друзі Вілла зустрічають дивну дівчинку з татуюванням "011". Гокінс поринає в темряву.', villain: 'Демогоргон', highlights: ['Знайомство з Одинадцятою', 'Перевернутий Світ', 'Демогоргон'], color: '#e50914' },
  { number: 2, title: 'Mind Flayer', year: 2017, episodes: 9, rating: 8.4, image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Вілл повернувся, але щось змінилось. Тінь з Перевернутого Світу переслідує його. Одинадцята шукає свою матір. Новий монстр загрожує всьому Гокінсу.', villain: 'Mind Flayer / Тінь', highlights: ['Дарт та Демо-пес', 'Повернення Одинадцятої', 'Нові персонажі'], color: '#7c3aed' },
  { number: 3, title: 'Старкур Молл', year: 2019, episodes: 8, rating: 8.4, image: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Літо 1985. Новий торговий центр Старкур. Але під ним — секретна радянська лабораторія знову відкриває портал. Монстр стає сильнішим, дружба — міцнішою.', villain: 'Mind Flayer (фізична форма)', highlights: ['Радянська загроза', 'Нові стосунки', 'Прощання з Гоппером'], color: '#e50914' },
  { number: 4, title: 'Векна Кличе', year: 2022, episodes: 9, rating: 8.9, image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Найтемніший та найбільший сезон. Векна — жахливий злочинець з Перевернутого Світу — атакує Гокінс. Таємниці Одинадцятої розкриваються. Банда розділена, але сильніша ніж будь-коли.', villain: 'Векна (001 / Генрі Крілл)', highlights: ['Векна і 001', 'Таємниця лабораторії', 'Макс та Running Up That Hill'], color: '#00fff5' },
];

const facts = [
  { number: '01', title: 'Атланта, Джорджія', description: 'Серіал знімався в Атланті, Джорджія — місті, яке стало другим Голівудом завдяки податковим пільгам для кіновиробників.', icon: '📍' },
  { number: '02', title: '50+ варіантів назви', description: 'Назва «Stranger Things» була обрана з понад 50 варіантів. Брати Даффер довго шукали ідеальне поєднання загадковості та простоти.', icon: '🎬' },
  { number: '03', title: 'Один день', description: 'Вінона Райдер погодилась на роль Джойс Байєрс лише за один день після отримання сценарію — вона одразу відчула зв\'язок з персонажем.', icon: '⚡' },
  { number: '04', title: 'Montauk', description: 'Оригінальна назва серіалу була «Montauk» — за назвою міста в Нью-Йорку, де спочатку мала відбуватись дія серіалу.', icon: '🌊' },
];

type Character = typeof characters[0];

function CharacterModal({ char, onClose }: { char: Character; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-img-wrap">
          <img src={char.image} alt={char.name} />
          <div className="modal-img-grad" />
          <div className="modal-badge" style={{ color: char.color, borderColor: char.color }}>{char.tag}</div>
        </div>
        <div className="modal-body">
          <p className="modal-actor" style={{ color: char.color }}>{char.actor}</p>
          <h2 className="modal-name">{char.name}</h2>
          <p className="modal-role">{char.role}</p>
          <div className="modal-divider" style={{ background: char.color }} />
          <p className="modal-full-desc">{char.fullDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeS, setActiveS] = useState(0);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    container.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.cssText = `left:${8 + i * 7.5}%;top:${15 + (i % 5) * 15}%;animation-delay:${i * 0.7}s;animation-duration:${6 + (i % 4)}s`;
      container.appendChild(p);
    }
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const closeMob = () => setMobileOpen(false);
  const s = seasons[activeS];

  return (
    <>
      {/* NAVBAR */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo neon-red text-flicker">ДИВНІ ДИВА</a>
          <ul className="nav-ul">
            <li><a href="#about">Про серіал</a></li>
            <li><a href="#characters">Персонажі</a></li>
            <li><a href="#seasons">Сезони</a></li>
            <li><a href="#facts">Цікаві факти</a></li>
            <li><a href="#facts" className="nav-cta btn-neon">Дивитись</a></li>
          </ul>
          <button className="hamburger" onClick={() => setMobileOpen(v => !v)} aria-label="Меню">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
        <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
          <a href="#about" onClick={closeMob}>Про серіал</a>
          <a href="#characters" onClick={closeMob}>Персонажі</a>
          <a href="#seasons" onClick={closeMob}>Сезони</a>
          <a href="#facts" onClick={closeMob}>Цікаві факти</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="film-grain" />
        <div className="film-vignette" />
        <div className="film-scanlines" />
        <div className="film-flicker" />
        <div className="hero-bg" />
        <div className="hero-ov-b" />
        <div className="hero-ov-r" />
        <div className="hero-glow pulse-red" />
        <div ref={particlesRef} id="particles" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot pulse-red" />
            <span className="hero-badge-txt">Netflix Оригінал</span>
          </div>
          <span className="hero-t1 neon-red text-flicker">ДИВНІ</span>
          <span className="hero-t2">ДИВА</span>
          <p className="hero-desc">
            Маленьке місто. Темні таємниці. Інший вимір.<br />
            <span className="accent">Добре проти зла.</span> Щоразу складніший вибір.
          </p>
          <div className="hero-btns">
            <a href="#facts" className="btn-play btn-heartbeat glow-red">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
              Дивитись зараз
            </a>
            <a href="#about" className="btn-outline btn-neon">Дізнатись більше</a>
          </div>
          <div className="hero-stats">
            <div><span className="stat-val neon-cyan">4</span><span className="stat-lbl">Сезони</span></div>
            <div><span className="stat-val neon-cyan">34</span><span className="stat-lbl">Епізоди</span></div>
            <div><span className="stat-val neon-cyan">8.7</span><span className="stat-lbl">Рейтинг IMDb</span></div>
            <div><span className="stat-val neon-cyan">2016</span><span className="stat-lbl">Рік виходу</span></div>
          </div>
        </div>
        <a href="#about" className="hero-scroll">
          <span>Гортай</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </a>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-bg" /><div className="about-gl" /><div className="about-gr" />
        <div className="sec-inner">
          <div className="about-grid">
            <div>
              <p className="sec-tag">/ Про серіал</p>
              <h2 className="sec-h2">КОЛИ ЗНИКАЮТЬ<br /><span className="neon-red">ДІТИ</span></h2>
              <p className="about-p">У невеликому американському містечку Гокінс, штат Індіана, зникає хлопчик Вілл Байєрс. Його мати й місцевий шериф починають розслідування, яке відкриває надприродні таємниці, секретні урядові експерименти та моторошні паралельні виміри.</p>
              <p className="about-p2">Серіал, повний ностальгії за 80-ми, жахів, пригод і неймовірної дружби між дітьми, що стала культовою для цілого покоління. Браво, брати Даффер.</p>
              <div className="tags-row">
                {['Наукова фантастика','Жах','Пригоди','Драма','80-ті'].map(t => <span key={t} className="tag-pill">{t}</span>)}
              </div>
            </div>
            <div className="about-right">
              <div className="img-frame">
                <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Атмосфера серіалу" loading="lazy" />
                <div className="img-grad" /><div className="img-brd" />
                <div className="img-cap"><span className="place">Гокінс, Індіана</span><br /><span className="yr">1983 рік</span></div>
              </div>
              <div className="feats">
                <div className="feat card-hover">
                  <div className="feat-icon red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" /></svg></div>
                  <div><h3>Надприродне</h3><p>Таємничі сили, психокінез і портал в інший вимір — Перевернутий Світ чекає.</p></div>
                </div>
                <div className="feat card-hover">
                  <div className="feat-icon cyan"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /></svg></div>
                  <div><h3>Жах і напруга</h3><p>Демогоргони, розплавлені тіла, тіньові монстри — кожен сезон темніший за попередній.</p></div>
                </div>
                <div className="feat card-hover">
                  <div className="feat-icon red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.5 6.51a11 11 0 0 1 1 0M21 4.27a23.39 23.39 0 0 0-18 0" /></svg></div>
                  <div><h3>Дружба назавжди</h3><p>Серед хаосу — банда дітей, які ніколи не здаються і рятують один одного.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHARACTERS */}
      <section id="characters">
        <div className="div-t" /><div className="chars-bg" />
        <div className="sec-inner" style={{ position: 'relative', zIndex: 10 }}>
          <div className="sec-center">
            <p className="sec-tag">/ Персонажі</p>
            <h2 className="sec-h2">БАНДА З<br /><span className="neon-red">ГОКІНСУ</span></h2>
            <p className="sec-sub">Дружба, що витримала темряву. Клікніть на картку, щоб дізнатись більше.</p>
          </div>
          <div className="chars-grid">
            {characters.map(c => (
              <div key={c.name} className="char-card card-hover" onClick={() => setSelectedChar(c)} style={{ cursor: 'pointer' }}>
                <div className="char-img-box">
                  <img src={c.image} alt={c.name} loading="lazy" />
                  <div className="char-color-ov" style={{ background: c.color }} />
                  <div className="char-grad" />
                  <div className="char-badge" style={{ color: c.color, borderColor: c.color }}>{c.tag}</div>
                </div>
                <div className="char-info">
                  <p className="char-actor" style={{ color: c.color }}>{c.actor}</p>
                  <h3 className="char-name">{c.name}</h3>
                  <p className="char-role">{c.role}</p>
                  <p className="char-desc">{c.description}</p>
                </div>
                <div className="char-line" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                <div className="char-click-hint">Детальніше →</div>
              </div>
            ))}
          </div>
        </div>
        <div className="div-b" />
      </section>

      {/* SEASONS */}
      <section id="seasons">
        <div className="seasons-bg" />
        <div className="sec-inner">
          <div className="sec-center">
            <p className="sec-tag">/ Сезони</p>
            <h2 className="sec-h2">КОЖЕН СЕЗОН —<br /><span className="neon-red">НОВИЙ ЖАХ</span></h2>
          </div>
          <div className="season-tabs">
            {seasons.map((s2, i) => (
              <button key={i} className={`s-tab btn-neon${i === activeS ? ' active' : ''}`} onClick={() => setActiveS(i)}>
                Сезон {s2.number}
              </button>
            ))}
          </div>
          <div className="season-detail">
            <div className="s-img-wrap">
              <img src={s.image} alt={`Сезон ${s.number}`} loading="lazy" />
              <div className="s-ov-l" /><div className="s-ov-b" />
              <div className="s-num" style={{ color: s.color }}>0{s.number}</div>
              <div className="s-villain">
                <div className="s-villain-lbl">Головний антагоніст</div>
                <div className="s-villain-name" style={{ color: s.color }}>{s.villain}</div>
              </div>
              <div className="s-img-brd" style={{ borderColor: `${s.color}40` }} />
            </div>
            <div className="s-info">
              <div>
                <span className="s-badge-lbl" style={{ color: s.color, borderColor: s.color }}>Сезон {s.number}</span>
                <h3 className="s-title">{s.title.toUpperCase()}</h3>
                <p className="s-desc">{s.description}</p>
              </div>
              <div className="s-meta">
                <div className="s-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  <span>{s.year}</span>
                </div>
                <div className="s-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
                  <span>{s.episodes} епізодів</span>
                </div>
                <div className="s-meta-item star-item">
                  <svg viewBox="0 0 24 24" fill="#eab308" width="16" height="16"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
                  <span style={{ fontWeight: 600 }}>{s.rating} / 10</span><span className="imdb-txt">IMDb</span>
                </div>
              </div>
              <div>
                <p className="hl-lbl">Ключові моменти</p>
                {s.highlights.map(h => (
                  <div key={h} className="hl-row">
                    <span className="hl-arrow" style={{ color: s.color }}>›</span>
                    <span className="hl-text">{h}</span>
                  </div>
                ))}
              </div>
              <a href="#facts" className="s-watch-btn btn-neon" style={{ borderColor: s.color, color: s.color }}>
                Дивитись сезон {s.number}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><polyline points="9,18 15,12 9,6" /></svg>
              </a>
            </div>
          </div>
          <div className="dots-row">
            {seasons.map((_, i) => (
              <button key={i} className={`dot-btn${i === activeS ? ' active' : ''}`} style={{ width: i === activeS ? '2.5rem' : '0.75rem' }} onClick={() => setActiveS(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section id="facts">
        <div className="div-t" />
        <div className="facts-bg" />
        <div className="facts-glow pulse-red" />
        <div className="sec-inner">
          <div className="sec-center">
            <p className="sec-tag">/ Цікаві факти</p>
            <h2 className="sec-h2">ЗА ЛАШТУНКАМИ<br /><span className="neon-red">СЕРІАЛУ</span></h2>
            <p className="sec-sub" style={{ marginTop: '1.5rem' }}>Факти, які ви могли не знати про одне з найвидатніших шоу Netflix.</p>
          </div>
          <div className="facts-grid">
            {facts.map(f => (
              <div key={f.number} className="fact-card card-hover">
                <div className="fact-number">{f.number}</div>
                <div className="fact-icon-wrap">{f.icon}</div>
                <h3 className="fact-title">{f.title}</h3>
                <p className="fact-desc">{f.description}</p>
                <div className="fact-line" />
              </div>
            ))}
          </div>
          <div className="facts-cta">
            <div className="cta-outer">
              <div className="cta-blur pulse-red" />
              <button className="cta-btn btn-neon glow-red">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5,3 19,12 5,21" /></svg>
                Дивитись зараз
              </button>
            </div>
            <p className="cta-note">Перший місяць безкоштовно на Netflix</p>
          </div>
          <div className="site-footer">
            <p className="footer-logo neon-red">ДИВНІ ДИВА</p>
            <p className="footer-copy">© 2016–2025 Netflix, Inc. Всі права захищені.</p>
            <div className="footer-links">
              <a href="#">Конфіденційність</a>
              <a href="#">Умови</a>
              <a href="#">Контакти</a>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL TO TOP */}
      <button className={`scroll-top-btn${showTop ? ' visible' : ''}`} onClick={scrollToTop} aria-label="Вгору">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <polyline points="18,15 12,9 6,15" />
        </svg>
      </button>

      {/* CHARACTER MODAL */}
      {selectedChar && <CharacterModal char={selectedChar} onClose={() => setSelectedChar(null)} />}
    </>
  );
}
