export type WritingEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  displayDate: string;
  readingTime: string;
  topics: string[];
};

export const writingEntries: WritingEntry[] = [
  {
    slug: "building-a-crash-safe-storage-engine",
    title: "Building StoneleafDB",
    description:
      "Working upward from pages and recovery toward transactions, replication, and failover.",
    date: "2026-07-30",
    displayDate: "July 30, 2026",
    readingTime: "5 min read",
    topics: ["Storage", "Distributed systems"],
  },
];

export const findWritingEntry = (slug?: string) =>
  writingEntries.find((entry) => entry.slug === slug);
