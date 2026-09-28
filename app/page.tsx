"use client"

import { useMemo, useState } from "react"
import { ArrowRight, Check, ChevronDown, Copy, Download, GitBranch, Search, Sparkles, Terminal, WandSparkles } from "lucide-react"

const transcript = [
  { role: "system", time: "09:41:02", text: "Claude Code Action started on pull request #184." },
  { role: "user", time: "09:41:09", text: "Review the authentication changes and flag any security regressions." },
  { role: "assistant", time: "09:41:16", text: "I’ll inspect the changed files, trace the session flow, and report only actionable findings." },
  { role: "assistant", time: "09:42:03", text: "Found one issue: the callback route accepts an unvalidated redirect URL. I recommend restricting it to trusted origins before merging." },
  { role: "user", time: "09:42:18", text: "Can you patch that and add a regression test?" },
  { role: "assistant", time: "09:43:11", text: "Patch prepared. The callback now validates the origin and the test covers an external redirect attempt." },
]

export default function Home() {
  const [query, setQuery] = useState("")
  const [format, setFormat] = useState("Readable")
  const [copied, setCopied] = useState(false)
  const results = useMemo(() => transcript.filter((item) => item.text.toLowerCase().includes(query.toLowerCase())), [query])
  const copyTranscript = async () => {
    await navigator.clipboard?.writeText(results.map((item) => `[${item.time}] ${item.role}: ${item.text}`).join("\n"))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return <main className="shell">
    <nav className="nav"><a className="brand" href="#top"><span className="logo"><Terminal size={17} /></span><span>CLAUDE<span className="brand-accent">/</span>CODE</span></a><div className="nav-links"><a href="#workspace">Workspace</a><a href="#how-it-works">How it works</a><a href="#security">Security</a></div><a className="nav-login" href="/api/auth/oauth?provider=github"><GitBranch size={16} /> Sign in</a></nav>
    <section id="top" className="hero"><div className="eyebrow"><span className="pulse" /> Built for teams shipping with Claude</div><h1>Turn every code review<br /><em>into shared context.</em></h1><p className="hero-copy">A calmer way to onboard your team, review Claude Code Action runs, and keep the reasoning behind every change close at hand.</p><div className="hero-actions"><a className="button primary" href="#workspace">Open your workspace <ArrowRight size={16} /></a><a className="button secondary" href="/api/auth/oauth?provider=google">Continue with Google</a></div><p className="microcopy">OAuth onboarding · No passwords to remember · Read-only by default</p></section>
    <section id="workspace" className="workspace"><div className="workspace-top"><div><div className="section-kicker">TRANSCRIPT WORKSPACE</div><h2>Review run <span>#184</span></h2></div><div className="workspace-actions"><button className="icon-button" onClick={copyTranscript} aria-label="Copy transcript">{copied ? <Check size={16} /> : <Copy size={16} />}</button><button className="export-button"><Download size={15} /> Export <ChevronDown size={14} /></button></div></div><div className="workspace-grid"><aside className="sidebar"><div className="sidebar-label">RUNS <span>12</span></div><div className="run active"><span className="run-status success" /><div><strong>#184 · Auth review</strong><small>Today, 09:41</small></div></div><div className="run"><span className="run-status success" /><div><strong>#183 · Fix flaky test</strong><small>Yesterday, 16:20</small></div></div><div className="run"><span className="run-status muted" /><div><strong>#182 · Dependency audit</strong><small>Sep 24, 11:08</small></div></div><div className="sidebar-footer"><Sparkles size={15} /> <span>Powered by Claude Code Action</span></div></aside><div className="transcript"><div className="toolbar"><label className="search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transcript..." aria-label="Search transcript" /></label><div className="format-control"><WandSparkles size={14} /><select value={format} onChange={(event) => setFormat(event.target.value)} aria-label="Transcript format"><option>Readable</option><option>Markdown</option><option>Plain text</option></select></div></div><div className="transcript-meta"><span>{results.length} messages</span><span className="dot-separator">·</span><span>main → feat/auth-hardening</span><span className="meta-status">Complete</span></div><div className={`messages format-${format.toLowerCase().replace(" ", "-")}`}>{results.length ? results.map((item, index) => <article className={`message ${item.role}`} key={`${item.time}-${index}`}><div className="message-avatar">{item.role === "assistant" ? <Terminal size={13} /> : item.role === "user" ? "Y" : "·"}</div><div className="message-body"><div className="message-head"><strong>{item.role === "assistant" ? "Claude" : item.role === "user" ? "You" : "System"}</strong><time>{item.time}</time></div><p>{item.text}</p></div></article>) : <div className="empty"><Search size={22} /><strong>No matching messages</strong><span>Try a different search term.</span></div>}</div></div></div></section>
    <section id="how-it-works" className="feature-row"><div><span className="feature-number">01</span><h3>Onboard in one click</h3><p>Use your existing GitHub or Google identity. No new credentials, no setup maze.</p></div><div><span className="feature-number">02</span><h3>Find the signal</h3><p>Search across a run instantly and switch between readable, Markdown, and plain text.</p></div><div id="security"><span className="feature-number">03</span><h3>Share with confidence</h3><p>Transcripts stay read-only by default, with clear branch and completion context.</p></div></section>
    <footer><a className="brand" href="#top"><span className="logo"><Terminal size={15} /></span><span>CLAUDE<span className="brand-accent">/</span>CODE</span></a><span>Built for thoughtful automation.</span></footer>
  </main>
}
