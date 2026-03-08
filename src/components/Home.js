
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Investing Made Easier <br />
          <span>With Fidelity Trusted Support.</span>
        </h1>

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

      </div>
    </section>
  );
}

export default Home;


