import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const transcript = typeof body.transcript === "string" ? body.transcript.trim() : ""

    if (!transcript) {
      return NextResponse.json({ error: "Transcript is required." }, { status: 400 })
    }

    const { text } = await generateText({
      model: "google/gemini-3.5-flash",
      system: "You format Claude Code Action transcripts for engineers. Preserve every fact and speaker, improve scanability, and return only the formatted transcript.",
      prompt: `Format this transcript as concise Markdown with clear speaker labels and timestamps:\n\n${transcript}`,
    })

    return NextResponse.json({ text })
  } catch (error) {
    console.error("[v0] Gemini transcript formatting failed", error)
    return NextResponse.json({ error: "Unable to format the transcript right now." }, { status: 500 })
  }
}
