import styles from "./styles.css";

const app = document.createElement("div");

app.innerHTML = `<h1 class="${styles.title}">Welcome</h1>`;

document.body.appendChild(app);
