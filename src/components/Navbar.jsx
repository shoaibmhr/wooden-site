

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">

        <a href="#home" className="logo">
          WOOD<span>CRAFT</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#quote" className="quote-btn">
          Get a Quote
        </a>

      </div>
    </header>
  )
}

export default Navbar