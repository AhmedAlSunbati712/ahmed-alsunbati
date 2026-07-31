/* eslint-disable react-refresh/only-export-components */
import {
  Fragment,
  type ReactNode,
} from "react";

import { ArticleVisual } from "./ArticleVisuals";

type TextBlock = {
  type: "paragraph";
  text: string;
};

type HeadingBlock = {
  type: "heading";
  depth: number;
  text: string;
  id: string;
};

type CodeBlock = {
  type: "code";
  text: string;
  index: number;
};

type TableBlock = {
  type: "table";
  headers: string[];
  rows: string[][];
};

type ListItem = {
  text: string;
  children: ListBlock[];
};

type ListBlock = {
  type: "list";
  ordered: boolean;
  items: ListItem[];
};

type MarkdownBlock =
  | TextBlock
  | HeadingBlock
  | CodeBlock
  | TableBlock
  | ListBlock;

const cleanHeading = (heading: string) => {
  const withoutNumber = heading.replace(/^\d+\.\s+/, "");
  if (withoutNumber === "B-Trees and B+ Trees") return "B-Trees vs. B+ Trees";
  if (withoutNumber === "Next") return "What Comes Next";
  return withoutNumber;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const splitTableRow = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());

const listPattern = /^(\s*)([-+*]|\d+\.)\s+(.*)$/;

const parseList = (
  lines: string[],
  start: number,
  baseIndent: number,
): { block: ListBlock; next: number } => {
  const first = lines[start].match(listPattern)!;
  const ordered = /\d+\./.test(first[2]);
  const items: ListItem[] = [];
  let index = start;

  while (index < lines.length) {
    const match = lines[index].match(listPattern);
    if (!match) break;
    const indent = match[1].length;
    if (indent < baseIndent) break;
    if (indent > baseIndent) {
      const child = parseList(lines, index, indent);
      items[items.length - 1]?.children.push(child.block);
      index = child.next;
      continue;
    }

    const currentOrdered = /\d+\./.test(match[2]);
    if (currentOrdered !== ordered) break;

    const item: ListItem = { text: match[3], children: [] };
    items.push(item);
    index += 1;

    while (index < lines.length) {
      if (!lines[index].trim()) break;
      const nextMatch = lines[index].match(listPattern);
      if (nextMatch) {
        const nextIndent = nextMatch[1].length;
        if (nextIndent > baseIndent) {
          const child = parseList(lines, index, nextIndent);
          item.children.push(child.block);
          index = child.next;
          continue;
        }
        break;
      }
      if (/^\s+/.test(lines[index])) {
        item.text += ` ${lines[index].trim()}`;
        index += 1;
        continue;
      }
      break;
    }
  }

  return { block: { type: "list", ordered, items }, next: index };
};

export const parseMarkdown = (markdown: string) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;
  let codeIndex = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const content: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        content.push(lines[index]);
        index += 1;
      }
      blocks.push({
        type: "code",
        text: content.join("\n"),
        index: codeIndex,
      });
      codeIndex += 1;
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const text = cleanHeading(heading[2].trim());
      blocks.push({
        type: "heading",
        depth: heading[1].length,
        text,
        id: slugify(text),
      });
      index += 1;
      continue;
    }

    if (
      line.trim().startsWith("|") &&
      lines[index + 1]?.match(/^\s*\|?[\s:|-]+\|/)
    ) {
      const headers = splitTableRow(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    const listMatch = line.match(listPattern);
    if (listMatch) {
      const parsed = parseList(lines, index, listMatch[1].length);
      blocks.push(parsed.block);
      index = parsed.next;
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length) {
      const next = lines[index];
      if (
        !next.trim() ||
        next.startsWith("```") ||
        /^(#{1,6})\s+/.test(next) ||
        listPattern.test(next) ||
        (next.trim().startsWith("|") &&
          lines[index + 1]?.match(/^\s*\|?[\s:|-]+\|/))
      ) {
        break;
      }
      paragraph.push(next.trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
};

const inlinePattern =
  /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;

const renderInline = (text: string): ReactNode[] =>
  text.split(inlinePattern).map((part, index) => {
    if (!part) return null;
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a href={link[2]} key={index}>
          {link[1]}
        </a>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });

const RenderList = ({ block }: { block: ListBlock }) => {
  const Tag = block.ordered ? "ol" : "ul";
  return (
    <Tag>
      {block.items.map((item, index) => (
        <li key={`${item.text}-${index}`}>
          <span>{renderInline(item.text)}</span>
          {item.children.map((child, childIndex) => (
            <RenderList block={child} key={childIndex} />
          ))}
        </li>
      ))}
    </Tag>
  );
};

export const articleHeadingsFromMarkdown = (markdown: string) =>
  parseMarkdown(markdown)
    .filter(
      (block): block is HeadingBlock =>
        block.type === "heading" && block.depth === 2,
    )
    .map(({ id, text }) => ({ id, title: text }));

export const MarkdownArticle = ({ markdown }: { markdown: string }) => {
  const blocks = parseMarkdown(markdown);

  return (
    <div className="article-prose">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.depth === 1) return null;
          const Tag = block.depth === 2 ? "h2" : "h3";
          return (
            <Tag id={block.id} key={`${block.id}-${index}`}>
              {block.text}
            </Tag>
          );
        }
        if (block.type === "paragraph") {
          return <p key={index}>{renderInline(block.text)}</p>;
        }
        if (block.type === "list") {
          return <RenderList block={block} key={index} />;
        }
        if (block.type === "code") {
          if (block.index === 6) return null;
          if (block.index === 3) {
            return (
              <Fragment key={`visual-${block.index}`}>
                <ArticleVisual index={block.index} />
                <figure className="article-pseudocode">
                  <figcaption>Original pseudocode</figcaption>
                  <pre>
                    <code>{block.text}</code>
                  </pre>
                </figure>
              </Fragment>
            );
          }
          return (
            <ArticleVisual index={block.index} key={`visual-${block.index}`} />
          );
        }
        return (
          <div className="article-table-wrap" key={index}>
            <table>
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header}>{renderInline(header)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{renderInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
