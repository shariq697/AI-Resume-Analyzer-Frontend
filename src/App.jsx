import { useState } from "react";

export default function App() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        score: 0,
        strengths: [],
        weaknesses: [],
        summary: "Backend connection error",
      });
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 AI Resume Analyzer</h1>

        <textarea
          style={styles.textarea}
          placeholder="Paste your resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <button style={styles.button} onClick={analyzeResume}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {loading && <p style={styles.loading}>Analyzing with AI...</p>}

        {result && (
          <div style={styles.result}>
            <div style={styles.scoreBox}>
              <span style={styles.score}>{result.score}</span>
              <span style={styles.scoreText}>/100 ATS Score</span>
            </div>

            <p style={styles.summary}>{result.summary}</p>

            <div style={styles.grid}>
              <div style={styles.greenCard}>
                <h3>✔ Strengths</h3>
                <ul>
                  {result.strengths?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div style={styles.redCard}>
                <h3>⚠ Weaknesses</h3>
                <ul>
                  {result.weaknesses?.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #1e293b, #0f172a)",
    padding: "20px",
    fontFamily: "Arial",
  },

  card: {
    width: "100%",
    maxWidth: "850px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "30px",
    color: "white",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  textarea: {
    width: "100%",
    height: "180px",
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    resize: "none",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  loading: {
    textAlign: "center",
    marginTop: "10px",
    color: "#93c5fd",
  },

  result: {
    marginTop: "20px",
  },

  scoreBox: {
    textAlign: "center",
    marginBottom: "10px",
  },

  score: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#22c55e",
  },

  scoreText: {
    display: "block",
    color: "#94a3b8",
  },

  summary: {
    textAlign: "center",
    marginBottom: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  greenCard: {
    padding: "15px",
    borderRadius: "12px",
    background: "rgba(34,197,94,0.1)",
    border: "1px solid #22c55e",
  },

  redCard: {
    padding: "15px",
    borderRadius: "12px",
    background: "rgba(239,68,68,0.1)",
    border: "1px solid #ef4444",
  },
};