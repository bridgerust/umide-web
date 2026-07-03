import React from "react";

// Minimal, dependency-free markdown for GitHub release bodies: headings,
// bullet lists, bold, inline code, and links. Not a full parser — just enough
// to render our changelog cleanly.

function inline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Split on **bold**, `code`, and [label](url) while keeping delimiters.
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (tok.startsWith("**")) {
      nodes.push(<strong key={key} className="text-text">{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      nodes.push(
        <code key={key} className="rounded bg-glass px-1.5 py-0.5 font-mono text-[0.9em] text-cyan">
          {tok.slice(1, -1)}
        </code>,
      );
    } else {
      const label = tok.slice(1, tok.indexOf("]"));
      const url = tok.slice(tok.indexOf("(") + 1, -1);
      nodes.push(
        <a key={key} href={url} className="text-blue hover:underline" target="_blank" rel="noreferrer">
          {label}
        </a>,
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let list: React.ReactNode[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${key++}`} className="my-3 space-y-1.5 pl-5 text-dim marker:text-dim-2">
          {list}
        </ul>,
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^#{1,6}\s/.test(line)) {
      flushList();
      const level = line.match(/^#+/)![0].length;
      const text = line.replace(/^#+\s/, "");
      const cls = level <= 2 ? "mt-5 text-lg font-bold text-text" : "mt-4 font-semibold text-text";
      blocks.push(
        <p key={`h-${key++}`} className={cls}>
          {inline(text, `h${key}`)}
        </p>,
      );
    } else if (/^[-*]\s/.test(line)) {
      list.push(
        <li key={`li-${key++}`} className="list-disc">
          {inline(line.replace(/^[-*]\s/, ""), `li${key}`)}
        </li>,
      );
    } else if (line === "") {
      flushList();
    } else {
      flushList();
      blocks.push(
        <p key={`p-${key++}`} className="my-3 text-dim">
          {inline(line, `p${key}`)}
        </p>,
      );
    }
  }
  flushList();
  return <div className="text-[15px] leading-relaxed">{blocks}</div>;
}
