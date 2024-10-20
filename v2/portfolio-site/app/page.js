"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "How can I help you learn more about Tomislav and his resume?",
    },
  ]);

  // State to track dark mode preference
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from local storage and apply it
  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode));
      document.body.classList.toggle("dark-mode", JSON.parse(savedMode));
    } else {
      // Fallback to system preference if no saved preference
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDarkScheme);
      document.body.classList.toggle("dark-mode", prefersDarkScheme);
    }
  }, []);

  // Toggle dark mode manually
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
    localStorage.setItem("dark-mode", JSON.stringify(!isDarkMode)); // Save preference in local storage
  };

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
          {/* Dark Mode Toggle Button */}
        <div className="toggle-dark-mode" onClick={toggleDarkMode}>
        <img id="dark-mode-toggle"
          src={isDarkMode ? "/img/light.svg" : "/img/dark.svg"} 
          alt={isDarkMode ? "Light Mode" : "Dark Mode"} 
        />
        </div>
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
        {/* Hero Section */}
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
                  I am skilled in JavaScript and Python backend frameworks and enjoy using Jupyter Notebooks for various projects. Artificial Intelligence is a particular interest of mine.
                </span>
              </p>
              <div className='call-to-action'>
                <a href='/docs/Tomislav-Dukez-CV.pdf' className='btn black'>
                  View Resume
                </a>
                <a href='mailto:tomdu3@ymail.com' className='btn white'>
                  Contact Me
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

        {/* Other sections remain the same */}
        
        {/* Chatbot Section */}
        <section className='container chatbot'>
          <h2>
            <small>Talk to me</small>
            Chatbot
          </h2>
          <div className='chatbot-blue'>
            <div className='chat-info'>
              <h3>AI Chatbot</h3>
              <p>
                I've built an AI Chatbot for you with all my skills, work experience and my CV details.
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
