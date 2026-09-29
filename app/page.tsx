"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowUpRight, Check, ChevronDown, Copy, Download, GitBranch, Inbox, LayoutDashboard, Menu, Search, Settings2, Sparkles, Terminal, X } from "lucide-react"

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
  const [aiText, setAiText] = useState("")
  const [formatting, setFormatting] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const results = useMemo(() => transcript.filter((item) => item.text.toLowerCase().includes(query.toLowerCase())), [query])
  const plainText = results.map((item) => `[${item.time}] ${item.role}: ${item.text}`).join("\n")
  const exportedText = format === "Markdown"
    ? results.map((item) => `### ${item.role} · ${item.time}\n${item.text}`).join("\n\n")
    : format === "Plain text" ? results.map((item) => item.text).join("\n") : plainText

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        document.querySelector<HTMLInputElement>('input[aria-label="Search transcript"]')?.focus()
      }
    }
    window.addEventListener("keydown", onShortcut)
    return () => window.removeEventListener("keydown", onShortcut)
  }, [])

  const formatWithGemini = async () => {
    setFormatting(true)
    try {
      const response = await fetch("/api/ai/format", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ transcript: plainText }) })
      const data = (await response.json()) as { text?: string; error?: string }
      setAiText(data.text ?? data.error ?? "")
    } finally { setFormatting(false) }
  }
  const copyTranscript = async () => {
    await (globalThis.navigator as Navigator & { clipboard?: { writeText(value: string): Promise<void> } }).clipboard?.writeText(exportedText)
    setCopied(true)
    globalThis.setTimeout(() => setCopied(false), 1600)
  }
  const downloadTranscript = () => {
    const blob = new Blob([exportedText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `claude-code-run-184-${format.toLowerCase().replace(" ", "-")}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return <main className="app-shell">
    <aside className={`app-sidebar ${mobileNav ? "mobile-open" : ""}`}>
      <div className="sidebar-brand"><span className="mark"><Terminal size={16} /></span><span>CLAUDE<span className="accent">/</span>CODE</span><button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="sidebar-section"><span className="sidebar-heading">Workspace</span><a className="side-link active" href="#workspace"><LayoutDashboard size={16} /> Overview</a><a className="side-link" href="#workspace"><Inbox size={16} /> All runs <span className="side-count">12</span></a></div>
      <div className="sidebar-section runs-section"><span className="sidebar-heading">Recent runs</span><a className="run-link selected" href="#run-184"><i className="status-dot done" /><span><b>#184 · Auth review</b><small>Today, 09:41</small></span></a><a className="run-link" href="#run-183"><i className="status-dot done" /><span><b>#183 · Fix flaky test</b><small>Yesterday, 16:20</small></span></a><a className="run-link" href="#run-182"><i className="status-dot idle" /><span><b>#182 · Dependency audit</b><small>Sep 24, 11:08</small></span></a></div>
      <div className="sidebar-bottom"><a className="side-link" href="#security"><Settings2 size={16} /> Settings</a><div className="user-card"><span className="avatar">AW</span><span><b>Alex Wilson</b><small>Personal workspace</small></span><ChevronDown size={14} /></div></div>
    </aside>
    {mobileNav && <button className="mobile-backdrop" onClick={() => setMobileNav(false)} aria-label="Close menu" />}
    <div className="main-column">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><span>/</span><strong>Overview</strong></div><div className="topbar-actions"><span className="live-pill"><i /> All systems operational</span><a href="/api/auth/oauth?provider=github" className="signin"><GitBranch size={15} /> Sign in</a></div></header>
      <section className="content" id="workspace">
        <div className="welcome-row"><div><p className="overline">MONDAY, SEPTEMBER 29, 2026</p><h1>Good morning, Alex.</h1><p className="lede">Keep the reasoning behind every change close at hand.</p></div><a className="new-run" href="#run-184"><Sparkles size={15} /> View latest run</a></div>
        <div className="onboarding-strip"><div className="onboarding-copy"><span className="eyebrow-chip">START HERE</span><h2>Ship with confidence, not ceremony.</h2><p>Connect a repository, inspect the reasoning, and keep every useful decision searchable.</p></div><div className="onboarding-steps"><span className="onboarding-step done"><i><Check size={12} /></i><b>Connect</b></span><span className="onboarding-connector" /><span className="onboarding-step done"><i><Check size={12} /></i><b>Review</b></span><span className="onboarding-connector" /><span className="onboarding-step"><i>3</i><b>Ship</b></span></div><div className="credit-meter"><span><b>Starter credits</b><small>80% remaining</small></span><div><i /></div></div></div>
        <div className="stats"><div className="stat-card"><span className="stat-label">Total runs</span><strong>12</strong><small><em>+3</em> this week</small></div><div className="stat-card"><span className="stat-label">Review time saved</span><strong>4.8h</strong><small><em>+18%</em> vs last week</small></div><div className="stat-card"><span className="stat-label">Open findings</span><strong>02</strong><small>Needs your attention</small></div><div className="stat-card accent-card"><span className="stat-label">Workspace health</span><strong>98<span>%</span></strong><small>Everything looks good</small></div></div>
        <div className="section-title"><div><p className="overline">TRANSCRIPT WORKSPACE</p><h2 id="run-184">Review run <span>#184</span></h2></div><div className="run-context"><span className="status-label"><i className="status-dot done" /> Completed</span><span className="branch-label"><GitBranch size={14} /> main</span></div></div>
        <div className="workspace-card"><div className="workspace-toolbar"><label className="search"><Search size={16} /><input value={query} onChange={(event) => setQuery((event.target as unknown as { value: string }).value)} placeholder="Search this transcript" aria-label="Search transcript" /><kbd>⌘ K</kbd></label><div className="toolbar-actions"><select value={format} onChange={(event) => setFormat((event.target as unknown as { value: string }).value)} aria-label="Transcript format"><option>Readable</option><option>Markdown</option><option>Plain text</option></select><button className="ghost-action" onClick={copyTranscript} aria-label="Copy transcript">{copied ? <Check size={15} /> : <Copy size={15} />}</button><button className="ghost-action" onClick={downloadTranscript} aria-label="Download transcript"><Download size={15} /></button><button className="format-action" onClick={formatWithGemini} disabled={formatting || !results.length}><Sparkles size={15} /> {formatting ? "Formatting..." : "Format with AI"}</button></div></div><div className="transcript-header"><span><b>{results.length}</b> messages</span><span>Run completed in <b>2m 09s</b></span><span className="header-spacer" /><span>Updated just now</span></div><div className="messages">{results.length ? results.map((item, index) => <article className={`message ${item.role}`} key={`${item.time}-${index}`}><div className="message-rail"><span className={`message-avatar ${item.role}`}>{item.role === "assistant" ? <Terminal size={14} /> : item.role === "user" ? "AW" : "·"}</span><span className="message-line" /></div><div className="message-body"><div className="message-meta"><b>{item.role === "assistant" ? "Claude" : item.role === "user" ? "Alex Wilson" : "System"}</b><time>{item.time}</time></div><p>{item.text}</p></div></article>) : <div className="empty-search"><Search size={20} /><b>No matching messages</b><span>Try a different search term.</span></div>}{aiText && <div className="ai-preview"><div className="ai-title"><Sparkles size={15} /> AI formatted preview</div><p>{aiText}</p></div>}</div></div>
        <section className="bottom-grid" id="how-it-works"><div className="insight-card"><div className="card-heading"><span className="icon-box"><Sparkles size={16} /></span><span><b>One-click onboarding</b><small>Start where your team already works</small></span></div><p>Connect GitHub or Google to access your workspace. No new credentials, no setup maze.</p><a href="/api/auth/oauth?provider=google">Continue with Google <ArrowUpRight size={14} /></a></div><div className="insight-card"><div className="card-heading"><span className="icon-box"><GitBranch size={16} /></span><span><b>Read-only by default</b><small id="security">Built for safe collaboration</small></span></div><p>Your transcripts are easy to search, format, and share without giving up control of your code.</p><a href="#security">Learn about security <ArrowUpRight size={14} /></a></div></section>
      </section>
      <footer><span className="footer-brand"><span className="mark"><Terminal size={14} /></span> CLAUDE<span className="accent">/</span>CODE</span><span>Built for thoughtful automation.</span></footer>
    </div>
  </main>
}
