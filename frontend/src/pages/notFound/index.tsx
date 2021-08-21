import { Button } from "react-bootstrap";
import styles from "./notFound.module.css";

export default function NotFound(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.text}>404 NOT FOUND</div>
      <div className="d-flex align-items-center justify-content-center">
        <Button
          variant="dark"
          className="w-25 mt-3"
          onClick={() => window.location.href="/"}
        >Go home</Button>
      </div>
    </div>
  )
}