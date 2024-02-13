import { Link } from "react-router-dom";
import PageNav from "../src/components/PageNav";
import styles from "./Homepage.module.css";
import Button from "../src/components/Button";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/login" className="cta">
          <Button
            styles={{
              fontWeight: "700",
              position: "absolute",
              zIndex: "1000",
              fontSize: "1.4rem",
              bottom: "4rem",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "var(--color-brand--2)",
              color: "var(--color-dark--1)",
              boxShadow: "0 0.4rem 1.2rem rgba(36, 42, 46, 0.16)",
            }}
          >
            Start tracking now
          </Button>
        </Link>
      </section>
    </main>
  );
}
