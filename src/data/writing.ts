export type WritingSeries = {
  slug: string;
  title: string;
  description: string;
  status: string;
};

export type WritingEntry = {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  topics: string[];
  series: string;
  seriesPart: number;
};

export const writingSeries: WritingSeries[] = [
  {
    slug: "stoneleafdb",
    title: "StoneleafDB",
    description:
      "Building a database from its pages upward: indexes, recovery, transactions, and replication.",
    status: "Ongoing",
  },
];

export const writingEntries: WritingEntry[] = [
  {
    slug: "b-trees-and-on-disk-data",
    title: "B-Trees and How Databases Store Data on Disk",
    description:
      "Why storage engines use wide trees, and how their logical nodes become fixed-size pages, variable-length records, and durable writes.",
    readingTime: "20 min read",
    topics: ["B+ trees", "Storage engines", "On-disk formats"],
    series: "stoneleafdb",
    seriesPart: 1,
  },
];

export const findWritingEntry = (slug?: string) =>
  writingEntries.find((entry) => entry.slug === slug);

export const findWritingSeries = (slug?: string) =>
  writingSeries.find((series) => series.slug === slug);

export const entriesForSeries = (seriesSlug: string) =>
  writingEntries
    .filter((entry) => entry.series === seriesSlug)
    .sort((a, b) => a.seriesPart - b.seriesPart);
