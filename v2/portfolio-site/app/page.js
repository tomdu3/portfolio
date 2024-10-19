"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "How can I help you learn more about Tomislav and his resume?",
    },
  ]);

  const submitForm = async (e) => {
    e.preventDefault();
    let newMessages = [...messages, { role: "user", content: messageInput }];
    setMessages(newMessages);
    setMessageInput("");
    const apiMessage = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages,
      }),
    }).then((response) => response.json());
    setMessages([
      ...newMessages,
      { role: "system", content: apiMessage.message },
    ]);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header>
        <a href='#' className='logo-container'>
          <div className='logo'>TD</div>
          <div className='logo-text'>Portfolio</div>
        </a>
        <nav>
          <ul id='menu' className={menuOpen ? "active" : ""}>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#skills'>Skills</a>
            </li>
            <li>
              <a href='#projects'>Projects</a>
            </li>
            <li>
              <a href='mailto:tomdu3@ymail.com'>Contact Me</a>
            </li>
          </ul>
          <a href='#' className='mobile-toggle' onClick={toggleMenu}>
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeWidth='2'
                d='M5 7h14M5 12h14M5 17h14'
              />
            </svg>
          </a>
        </nav>
      </header>
      <main>
        <section className='container hero'>
          <div className='hero-blue'>
            <div>
              <h1>
                <small>Hi I'm</small>
                <big>Tomislav Dukez</big>
              </h1>
              <p>
                I am a Full Stack Software Developer and Data Analyst with a passion for creating, learning, and assisting others. 
                <br />
                I'm constantly seeking out new and exciting projects, and I take great joy in teaching coding skills to others.
                <br />
                <span>
                I am skilled in JavaScript and Python backend frameworks and enjoy using Jupyter Notebooks for various projects.  Artificial Intelligence is a particular interest of mine.
                </span>
              </p>
              <div className='call-to-action'>
                <a href='/docs/Tomislav-Dukez-CV.pdf' className='btn black'>
                  {" "}
                  View Resume{" "}
                </a>
                <a href='mailto:tomdu3@ymail.com' className='btn white'>
                  {" "}
                  Contact Me{" "}
                </a>
                <div className='social-links'>
                  <a href='https://github.com/tomdu3'>
                    <img src='/img/github.png' alt='GitHub' width='48' />
                  </a>
                  <a href='https://www.linkedin.com/in/tomislav-dukez/'>
                    <img src='/img/linkedin.png' alt='LinkedIn' width='48' />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='hero-yellow'>
            <img
              src='/img/myimgs/tdcode-hello.png'
              alt='Tomislav Dukez'
              width='100%'
            />
          </div>
        </section>
        <section className='container logos'>
          <div className='marquee'>
            <div className='track'>
              <img src='/img/logos/python.png' alt='Python' />
              <img src='/img/logos/fastapi.svg' alt='FastAPI' />
              <img src='/img/logos/django.svg' alt='Django' />
              <img src='/img/logos/flask.png' alt='Flask' />
              <img src='/img/logos/html.png' alt='HTML' />
              <img src='/img/logos/css.png' alt='CSS' />
              <img src='/img/logos/javascript.png' alt='JavaScript' />
              <img src='/img/logos/postgresql.png' alt='PostgreSQL' />
              <img src='/img/logos/docker.svg' alt='Docker' />
              <img src='/img/logos/tailwind.png' alt='Tailwind' />
              <img src='/img/logos/bootstrap.svg' alt='Bootstrap' />
              <img src='/img/logos/bash.png' alt='Bash' />
              <img src='/img/logos/nodejs.svg' alt='NodeJS' />
              <img src='/img/logos/express.png' alt='Express' />
              <img src='/img/logos/matplotlib.png' alt='Matplotlib' />
              <img src='/img/logos/scikit-learn.png' alt='Scikit-learn' />
              <img src='/img/logos/tensorflow.png' alt='Tensorflow' />
              <img src='/img/logos/streamlit.png' alt='Streamlit' />
              {/* Doubling for the marquee infinitie loop */}
              <img src='/img/logos/python.png' alt='Python' />
              <img src='/img/logos/fastapi.svg' alt='FastAPI' />
              <img src='/img/logos/django.svg' alt='Django' />
              <img src='/img/logos/flask.png' alt='Flask' />
              <img src='/img/logos/html.png' alt='HTML' />
              <img src='/img/logos/css.png' alt='CSS' />
              <img src='/img/logos/javascript.png' alt='JavaScript' />
              <img src='/img/logos/postgresql.png' alt='PostgreSQL' />
              <img src='/img/logos/docker.svg' alt='Docker' />
              <img src='/img/logos/tailwind.png' alt='Tailwind' />
              <img src='/img/logos/bootstrap.svg' alt='Bootstrap' />
              <img src='/img/logos/bash.png' alt='Bash' />
              <img src='/img/logos/nodejs.svg' alt='NodeJS' />
              <img src='/img/logos/express.png' alt='Express' />
              <img src='/img/logos/matplotlib.png' alt='Matplotlib' />
              <img src='/img/logos/scikit-learn.png' alt='Scikit-learn' />
              <img src='/img/logos/tensorflow.png' alt='Tensorflow' />
              <img src='/img/logos/streamlit.png' alt='Streamlit' />
            </div>
          </div>
        </section>
        <section id='skills' className='container skills'>
          <h2>
            <small>About Me</small>
            Skills
          </h2>
          <div className='holder-blue'>
            <div className='left-column'>
              <h3>Frontend</h3>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>Bootstrap</li>
                <li>Tailwind</li>
                <li>jQuery</li>
                <li>React</li>
              </ul>
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>FastAPI</li>
                <li>Django</li>
                <li>Flask</li>
                <li>Python</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
              </ul>
              <h3>Data Analyst</h3>
              <ul>
                <li>Jupyter Notebooks</li>
                <li>Pandas</li>
                <li>Matplotlib</li>
                <li>Numpy</li>
                <li>Seaborn</li>
                <li>Scikit-learn</li>
                <li>Tensorflow</li>
                <li>Streamlit</li>
                <li>PowerBI</li>
                <li>Tableau</li>
              </ul>
            </div>
            <div className='right-column'>
              <h3>A bit about me</h3>
              <p>
                I am a Full Stack Software Developer and Data Analyst in London.
                I love to teach others how to code and to collaborate on
                projects. Though I love playing with Frontend, I am a big fan of
                Backend. I code in JavaScript and Python Backend Frameworks like
                FastAPI, Django, Flask, NodeJS, Express.
              </p>
              <p>
                As Data Analyst, I like to play with Jupyter Notebooks, Pandas,
                Matplotlib, Numpy, Seaborn, Scikit-learn, Tensorflow, Streamlit,
                Tableau and PowerBI. AI is my passion, and I love to build AI
                tools and applications.
              </p>
            </div>
          </div>
        </section>
        <section id='projects' className='container bento'>
          <h2>
            <small>My</small>
            Projects
          </h2>
          <div className='bento-grid'>
            <a
              href='https://books-4-life-2d26bdf04dec.herokuapp.com/'
              className='bento-item'
            >
              <img src='/img/myimgs/portfolio1.png' alt='Portfolio 1' />
            </a>
            <a
              href='https://tomdu3.github.io/smiley-memories'
              className='bento-item'
            >
              <img src='/img/myimgs/portfolio2.png' alt='Portfolio 2' />
            </a>
            <a
              href='https://millionaire-kindof.herokuapp.com/'
              className='bento-item'
            >
              <img src='/img/myimgs/portfolio3.png' alt='Portfolio 3' />
            </a>
            <a
              href='https://tomdu3.github.io/smiling-depression'
              className='bento-item'
            >
              <img src='/img/myimgs/portfolio4.png' alt='Portfolio 4' />
            </a>
            <a
              href='https://brain-tumor-detector-e5d30222dbc4.herokuapp.com/'
              className='bento-item'
            >
              <img src='/img/myimgs/portfolio5.png' alt='Portfolio 5' />
            </a>
            <a
              href='https://hungryhippo-tgrams.onrender.com/'
              className='bento-item'
            >
              <img src='/img/myimgs/portfolio6.png' alt='Portfolio 6' />
            </a>
          </div>
        </section>
        <section className='container chatbot'>
          <h2>
            <small>Talk to me</small>
            Chatbot
          </h2>
          <div className='chatbot-blue'>
            <div className='chat-info'>
              <h3>AI Chatbot</h3>
              <p>
                I've built an AI Chatbot for you with all my skills, work
                experience and my CV details.
              </p>
              <p>
                I am currently looking for new opportunities, some
                projects to collaborate on, or just to say hi. Please, feel free
                to get in touch.
              </p>
              <a href='/docs/Tomislav-Dukez-CV.pdf' className='btn black'>
                Download Resume
              </a>
            </div>
            <div className='chat-box'>
              <div className='scroll-area'>
                <ul id='chat-log'>
                  {messages.map((message, index) => (
                    <li key={index} className={`${message.role}`}>
                      <span className={"avatar"}>
                        {message.role === "user" ? "You" : "AI"}
                      </span>
                      <div className='message'>{message.content}</div>
                    </li>
                  ))}
                  {/* <li>
                    <span className='avatar bot'>AI</span>
                    <div className='message'>
                      Hi, I am an Tom's AI Personal Assistant. How may I help
                      you?
                    </div>
                  </li>
                  <li>
                    <span className='avatar user'>User</span>
                    <div className='message'>
                      I have a question about your CV.
                    </div>
                  </li> */}
                </ul>
              </div>
              <form onSubmit={submitForm} className='chat-message'>
                <input
                  type='text'
                  placeholder='Hey Tomislav, what skills are you best at?'
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button className='btn black'>Send</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
