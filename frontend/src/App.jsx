import { useEffect, useState } from "react";

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API = "https://issue-tracker2-7629.onrender.com/issues";

  const fetchIssues = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setIssues(data);
  };

  const createIssue = async () => {
    if (!title || !description) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    fetchIssues();
  };

  const deleteIssue = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    fetchIssues();
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Issue Tracker</h1>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={styles.button} onClick={createIssue}>
          Create Issue
        </button>
      </div>

      <div style={styles.list}>
        {issues.map((issue) => (
          <div key={issue.id} style={styles.card}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <button
              style={styles.deleteBtn}
              onClick={() => deleteIssue(issue.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "40px",
    textAlign: "center",
  },
  heading: {
    fontSize: "40px",
    marginBottom: "30px",
  },
  form: {
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    minHeight: "100px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },
  list: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  card: {
    width: "400px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
  },
  deleteBtn: {
    marginTop: "10px",
    padding: "8px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;