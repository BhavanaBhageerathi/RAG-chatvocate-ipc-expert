import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/chat/";

export default function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I am Chatvocate, your Indian Penal Code expert. Ask me about sections, legal terms, or scenarios, and I'll find relevant details from the IPC for you. (This tool uses a plain text database of the IPC)." },
    { role: "example", text: "User: What is Section 302?\nChatvocate: Section 302 of the IPC deals with ‘Punishment for murder’. It states: [Snippet of the text for Section 302 from the provided IPC source...]" }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendQuestion(e) {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;
    setMessages(old => [...old, { role: "user", text: q }]);
    setQuestion(""); setLoading(true); setError("");
    try {
      const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: q }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to get an answer.");
      setMessages(old => [...old, { role: "answer", text: data.answer }]);
    } catch (err) {
      setError(err.message === "Failed to fetch" ? "Cannot connect to Django. Make sure the backend server is running." : err.message);
    } finally { setLoading(false); }
  }

  return <div className="chatvocate-bg min-vh-100 py-4">
    <main className="container chatvocate-shell">
      <header className="navbar chat-header rounded-3 shadow-sm p-3">
        <div><h1 className="h2 fw-bold mb-0">Chatvocate</h1><p className="small mb-0">IPC Legal Assistant</p></div>
        <nav className="d-flex gap-4"><a href="#about">About</a><a href="#ipc-sections">IPC Sections</a></nav>
      </header>
      <div className="row g-3 mt-0">
        <section className="col-lg-9">
          <div className="card chat-card"><div className="card-body d-flex flex-column p-2 p-md-3">
            <div className="conversation border rounded-3 bg-white p-2" aria-live="polite">
              {messages.map((m,i) => <div className={`message message-${m.role} rounded-2 p-3 mb-2`} key={i}>
                {m.role==="user" && <strong>You: </strong>}{m.role==="answer" && <strong>Chatvocate: </strong>}{m.text}
              </div>)}
              {loading && <div className="message message-answer rounded-2 p-3 mb-2"><strong>Chatvocate: </strong>Searching the IPC reference… <span className="spinner-border spinner-border-sm"/></div>}
              <div id="ipc-sections"/>
            </div>
            <form className="d-flex gap-2 mt-2" onSubmit={sendQuestion}>
              <label className="visually-hidden" htmlFor="question">Ask about the IPC</label>
              <textarea id="question" className="form-control question-input" rows="2" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask about the Indian Penal Code (e.g., 'Section 378' or 'definition of theft')..."/>
              <button className="btn btn-light border align-self-center" disabled={loading || !question.trim()}>{loading ? "..." : "Send"}</button>
            </form>
            {error && <div className="alert alert-danger py-2 mt-2 mb-0 small">{error}</div>}
          </div></div>
        </section>
        <aside className="col-lg-3">
          <section className="card info-card mb-3" id="about"><div className="card-body p-3">
            <h2 className="h6 fw-bold">How it Works</h2><ol className="small ps-3 mb-0">
              <li><strong>Type your question</strong> or search term below.</li>
              <li>Chatvocate retrieves relevant sections from its <strong>Indian Penal Code (IPC)</strong> reference.</li>
              <li>Your answer is generated based on the retrieved IPC text.</li>
              <li>Read the full IPC text for complete context. Links can be provided when available.</li>
            </ol>
          </div></section>
          <section className="card info-card"><div className="card-body p-3">
            <h2 className="h6 fw-bold">Source Data</h2><p className="small mb-2">IPC data sourced from legislative documents.</p>
            <p className="source-note mb-0">Answers are based on the uploaded IPC reference and may not reflect current law. Verify legal information against current legislation.</p>
          </div></section>
        </aside>
      </div>
      <footer className="text-center py-3">© 2024 Chatvocate. Non-framework RAG implementation.</footer>
    </main>
  </div>;
}
