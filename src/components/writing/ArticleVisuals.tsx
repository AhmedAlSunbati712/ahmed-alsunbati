import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type VisualSpec = {
  title: string;
  description: string;
  steps: number;
  interval?: number;
  render: (step: number) => ReactNode;
};

const useAutoplayStep = (stepCount: number, interval: number) => {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setStep(stepCount - 1);
      return;
    }
    if (!visible || stepCount < 2) return;

    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % stepCount),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [interval, stepCount, visible]);

  return { ref, step };
};

const Cells = ({
  values,
  active,
  tone = "plain",
}: {
  values: string[];
  active?: string;
  tone?: "plain" | "leaf" | "internal" | "free";
}) => (
  <div className={`viz-cells ${tone}`}>
    {values.map((value) => (
      <span className={value === active ? "active" : undefined} key={value}>
        {value}
      </span>
    ))}
  </div>
);

const Page = ({
  label,
  children,
  active = false,
}: {
  label: string;
  children: ReactNode;
  active?: boolean;
}) => (
  <div className={`viz-page ${active ? "active" : ""}`}>
    <small>{label}</small>
    {children}
  </div>
);

const BalancedTree = (step: number, pathological = false) => {
  const path = pathological ? ["1", "3", "6", "8"] : ["8", "3", "6"];
  const active = path[Math.min(step, path.length - 1)];

  if (pathological) {
    return (
      <div className="binary-tree pathological" aria-hidden="true">
        {["1", "3", "6", "8"].map((key, index) => (
          <div
            className={`binary-node ${active === key ? "active" : ""}`}
            key={key}
            style={{ "--depth": index } as React.CSSProperties}
          >
            {key}
          </div>
        ))}
      </div>
    );
  }

  const nodes = [
    { key: "8", x: 50, y: 8 },
    { key: "3", x: 27, y: 42 },
    { key: "10", x: 73, y: 42 },
    { key: "1", x: 15, y: 77 },
    { key: "6", x: 38, y: 77 },
    { key: "14", x: 85, y: 77 },
  ];
  return (
    <div className="binary-tree balanced" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M50 18 L27 48 M50 18 L73 48 M27 52 L15 82 M27 52 L38 82 M73 52 L85 82" />
      </svg>
      {nodes.map((node) => (
        <span
          className={`binary-node ${active === node.key ? "active" : ""}`}
          key={node.key}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.key}
        </span>
      ))}
    </div>
  );
};

const ThreeLevelBPlusTree = ({
  mode,
  step,
}: {
  mode: "anatomy" | "search";
  step: number;
}) => {
  const anatomy = mode === "anatomy";
  const rootPathActive = anatomy ? step >= 3 : step >= 1;
  const leafPathActive = anatomy ? step >= 4 : step >= 3;
  const showAllInternalPages = anatomy && (step === 0 || step === 1);
  const showAllLeaves = anatomy && (step === 0 || step === 2);
  const rootActive = anatomy
    ? step === 0 || step === 1 || step === 3
    : step <= 1;
  const leftInternalActive = anatomy
    ? step === 1 || step >= 3
    : step >= 1 && step <= 3;
  const targetLeafActive = anatomy ? step >= 4 : step >= 3;
  const rootKeyActive =
    (anatomy && step === 3) || (!anatomy && step === 1)
      ? "40"
      : undefined;
  const internalKeyActive =
    (anatomy && step >= 4) || (!anatomy && step === 2)
      ? "30"
      : undefined;
  const leafKeyActive =
    anatomy && step === 5
      ? "30:c"
      : !anatomy && step === 5
        ? "31:d"
        : undefined;

  return (
    <div className="search-tree" aria-hidden="true">
      <span className={`search-target ${anatomy && step < 3 ? "hidden" : ""}`}>
        target · 31
      </span>
      <svg
        className="search-tree-edges"
        viewBox="0 0 900 300"
        preserveAspectRatio="none"
      >
        <path className={rootPathActive ? "active" : ""} d="M450 58 L150 118" />
        <path d="M450 58 L450 118" />
        <path d="M450 58 L750 118" />
        <path d="M150 162 L50 238" />
        <path d="M150 162 L150 238" />
        <path className={leafPathActive ? "active" : ""} d="M150 162 L250 238" />
        <path d="M450 162 L350 238" />
        <path d="M450 162 L450 238" />
        <path d="M450 162 L550 238" />
        <path d="M750 162 L650 238" />
        <path d="M750 162 L750 238" />
        <path d="M750 162 L850 238" />
      </svg>
      <div className={`search-root ${rootActive ? "active" : ""}`}>
        <Cells
          active={rootKeyActive}
          values={["40", "80"]}
          tone="internal"
        />
      </div>
      <div className="search-internal-row">
        <div
          className={`search-internal ${
            leftInternalActive || showAllInternalPages ? "active" : ""
          }`}
        >
          <Cells
            active={internalKeyActive}
            values={["15", "30"]}
            tone="internal"
          />
        </div>
        <div className={`search-internal ${showAllInternalPages ? "active" : ""}`}>
          <Cells values={["50", "65"]} tone="internal" />
        </div>
        <div className={`search-internal ${showAllInternalPages ? "active" : ""}`}>
          <Cells values={["90", "105"]} tone="internal" />
        </div>
      </div>
      <div className="search-leaf-row">
        {[
          ["5:a"],
          ["15:b"],
          ["30:c", "31:d"],
          ["40:e"],
          ["50:f"],
          ["65:g"],
          ["80:h"],
          ["90:i"],
          ["105:j"],
        ].map((values, index) => (
          <div
            className={`search-leaf ${
              showAllLeaves || (index === 2 && targetLeafActive) ? "active" : ""
            }`}
            key={values.join("-")}
          >
            <Cells
              active={index === 2 ? leafKeyActive : undefined}
              values={values}
              tone="leaf"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const BPlusAnatomy = (step: number) => {
  const states = [
    "One root level, one internal level, and one leaf level.",
    "Internal pages contain separator keys and child page numbers.",
    "Leaf pages contain the complete key-value records.",
    "For target 31, separator 40 routes the search left.",
    "Separator 30 routes the search to the rightmost leaf.",
    "30 is copied into the internal page; its record remains in the leaf.",
  ];

  return (
    <div className="bplus-anatomy-visual">
      <ThreeLevelBPlusTree mode="anatomy" step={step} />
      <p className="anatomy-status" aria-live="polite">
        {states[step]}
      </p>
    </div>
  );
};

const SearchFlow = (step: number) => {
  const lines = [
    "start at the root with target 31",
    "31 < 40, so take the left internal page",
    "at [15, 30], no separator is ≥ 31",
    "take that internal page's rightmost child",
    "arrive at leaf [30:c, 31:d]",
    "binary-search the leaf and find 31",
  ];
  return (
    <div className="viz-code-flow">
      <ThreeLevelBPlusTree mode="search" step={step} />
      <div className="search-trace" aria-live="polite">
        {lines.map((line, index) => (
          <span
            className={`${index === step ? "active" : ""} ${
              index < step ? "complete" : ""
            }`}
            key={line}
          >
            <i>{index < step ? "✓" : ""}</i>
            {line}
          </span>
        ))}
      </div>
    </div>
  );
};

const BPlusCapacity = (step: number) => {
  const levels = [
    { name: "Root", count: "1 page", reach: "100 children" },
    { name: "Internal", count: "100 pages", reach: "10,000 children" },
    { name: "Internal", count: "10,000 pages", reach: "1 million children" },
    {
      name: "Internal",
      count: "1 million pages",
      reach: "100 million leaves",
    },
    {
      name: "Leaves",
      count: "100 million pages",
      reach: "99 records per leaf",
    },
  ];

  return (
    <div className="fanout-viz">
      <div className="fanout-path" aria-hidden="true">
        {levels.map((level, index) => (
          <Fragment key={`${level.name}-${level.count}`}>
            <div
              className={`fanout-page ${index === step ? "active" : ""} ${
                index < step ? "complete" : ""
              }`}
            >
              <span>{level.name}</span>
              <b>{level.count}</b>
              <i>{level.reach}</i>
            </div>
            {index < levels.length - 1 && (
              <div className={index < step ? "fanout-multiplier complete" : "fanout-multiplier"}>
                <span>× 100</span>
                <b>→</b>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="fanout-summary" aria-live="polite">
        <span>
          Level {step + 1} of {levels.length}
        </span>
        <strong>{levels[step].count}</strong>
        <p>{levels[step].reach}</p>
      </div>
      <div className="fanout-equation">
        <span>99 records</span>
        <b>×</b>
        <span>100⁴ leaf paths</span>
        <b>=</b>
        <strong>9.9 billion keys</strong>
      </div>
    </div>
  );
};

const PageReadComparison = (step: number) => {
  const bPlusReads = Math.min(step + 1, 5);
  const binaryReads = Math.min((step + 1) * 5, 30);

  return (
    <div className="read-comparison">
      <div className="read-path">
        <header>
          <div>
            <strong>B+ tree</strong>
            <span>wide pages</span>
          </div>
          <b>5 page reads</b>
        </header>
        <div className="page-read-track bplus" aria-label="Five B+ tree page reads">
          {Array.from({ length: 5 }, (_, index) => (
            <i className={index < bPlusReads ? "complete" : ""} key={index}>
              {index + 1}
            </i>
          ))}
        </div>
        <p>About 35 comparisons inside five pages.</p>
      </div>

      <div className="read-path binary">
        <header>
          <div>
            <strong>Binary tree</strong>
            <span>one key per page</span>
          </div>
          <b>30 page reads</b>
        </header>
        <div
          className="page-read-track binary"
          aria-label="Thirty binary tree page reads"
        >
          {Array.from({ length: 30 }, (_, index) => (
            <i className={index < binaryReads ? "complete" : ""} key={index}>
              {index + 1}
            </i>
          ))}
        </div>
        <p>About 30 comparisons, but across thirty dependent pages.</p>
      </div>

      <div className="read-comparison-status" aria-live="polite">
        <span>B+ path</span>
        <strong>{bPlusReads} / 5 pages</strong>
        <span>Binary path</span>
        <strong>{binaryReads} / 30 pages</strong>
      </div>
    </div>
  );
};

const LeafSplitWithRoom = (step: number) => {
  const split = step >= 2;
  const parentUpdated = step >= 3;
  const leaves = split
    ? [
        ["1:a", "3:b"],
        ["5:c", "12:d"],
        ["15:e", "20:f"],
        ["30:g", "35:h"],
      ]
    : [
        ["1:a", "3:b"],
        step === 1
          ? ["5:c", "12:d", "15:e", "20:f"]
          : ["5:c", "12:d", "20:f"],
        ["30:g", "35:h"],
      ];
  const statuses = [
    "The middle leaf is full; its parent still has one free separator slot.",
    "Insert 15 into the leaf. Four records overflow its three-record capacity.",
    "Split the leaf and keep 15 as the first record in the new right leaf.",
    "Copy 15 into the parent. The parent fits, so propagation stops here.",
  ];

  return (
    <div className="insertion-tree-visual">
      <div className="single-split-tree" aria-hidden="true">
        <svg viewBox="0 0 800 220" preserveAspectRatio="none">
          {(split
            ? [
                "M400 58 L100 164",
                "M400 58 L300 164",
                "M400 58 L500 164",
                "M400 58 L700 164",
              ]
            : [
                "M400 58 L135 164",
                "M400 58 L400 164",
                "M400 58 L665 164",
              ]
          ).map((path, index) => (
            <path
              className={
                (split && (index === 1 || index === 2)) ||
                (!split && index === 1)
                  ? "active"
                  : ""
              }
              d={path}
              key={path}
            />
          ))}
        </svg>
        <div className={`single-split-parent ${parentUpdated ? "active" : ""}`}>
          <Cells
            active={parentUpdated ? "15" : undefined}
            values={parentUpdated ? ["5", "15", "30"] : ["5", "30"]}
            tone="internal"
          />
        </div>
        <div
          className="single-split-leaves"
          style={{ "--leaf-count": leaves.length } as React.CSSProperties}
        >
          {leaves.map((values, index) => (
            <div
              className={
                (!split && index === 1) || (split && (index === 1 || index === 2))
                  ? "active"
                  : ""
              }
              key={values.join("-")}
            >
              <Cells
                active={
                  step === 1 && index === 1
                    ? "15:e"
                    : parentUpdated && index === 2
                      ? "15:e"
                      : undefined
                }
                values={values}
                tone="leaf"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="insertion-status" aria-live="polite">
        {statuses[step]}
      </p>
    </div>
  );
};

const CascadingTreeSplit = (step: number) => {
  const leafOverflow = step === 1;
  const parentOverflow = step === 2;
  const rootOverflow = step === 3;
  const rootSplit = step >= 4;
  const statuses = [
    "Continue from the same full parent, now beneath a full root.",
    "Insert 27. The affected leaf overflows and must split.",
    "Copy 25 upward. The parent now overflows with four separators.",
    "Split the parent and promote 25. The root now overflows too.",
    "Split the root, promote 80, and allocate a new root page.",
    "The tree is one level taller; every leaf remains at the same depth.",
  ];

  return (
    <div className="insertion-tree-visual cascading">
      <div className="cascading-tree" aria-hidden="true">
        {rootSplit && (
          <>
            <div className="cascade-level new-root">
              <small>new root</small>
              <Cells active={step === 4 ? "80" : undefined} values={["80"]} tone="internal" />
            </div>
            <span className="cascade-link" />
          </>
        )}

        <div className="cascade-level">
          <small>{rootSplit ? "split root pages" : "root · full"}</small>
          <div className="cascade-node-row">
            {rootSplit ? (
              <>
                <Cells values={["25", "50"]} tone="internal" />
                <Cells values={["110"]} tone="internal" />
              </>
            ) : (
              <Cells
                active={rootOverflow ? "25" : undefined}
                values={
                  rootOverflow
                    ? ["25", "50", "80", "110"]
                    : ["50", "80", "110"]
                }
                tone="internal"
              />
            )}
          </div>
        </div>
        <span className="cascade-link" />

        <div className="cascade-level">
          <small>{step >= 3 ? "split parent pages" : "parent · full"}</small>
          <div className="cascade-node-row">
            {step >= 3 ? (
              <>
                <Cells values={["5", "15"]} tone="internal" />
                <Cells values={["30"]} tone="internal" />
              </>
            ) : (
              <Cells
                active={parentOverflow ? "25" : undefined}
                values={
                  parentOverflow
                    ? ["5", "15", "25", "30"]
                    : ["5", "15", "30"]
                }
                tone="internal"
              />
            )}
          </div>
        </div>
        <span className="cascade-link" />

        <div className="cascade-level">
          <small>{leafOverflow ? "leaf · overflow" : "affected leaves"}</small>
          <div className="cascade-node-row">
            {step >= 2 ? (
              <>
                <Cells values={["15:a", "20:b"]} tone="leaf" />
                <Cells active={step === 2 ? "25:c" : undefined} values={["25:c", "27:d"]} tone="leaf" />
              </>
            ) : (
              <Cells
                active={leafOverflow ? "27:d" : undefined}
                values={
                  leafOverflow
                    ? ["15:a", "20:b", "25:c", "27:d"]
                    : ["15:a", "20:b", "25:c"]
                }
                tone="leaf"
              />
            )}
          </div>
        </div>
      </div>
      <p className="insertion-status" aria-live="polite">
        {statuses[step]}
      </p>
    </div>
  );
};

const Borrow = (step: number) => (
  <div className="repair-viz">
    <p>
      Parent separator <b>{step < 2 ? "20" : "30"}</b>
    </p>
    <div className="viz-leaf-row">
      <Cells
        active={step === 1 ? "20" : undefined}
        values={step < 2 ? ["10"] : ["10", "20"]}
        tone="leaf"
      />
      <span className={`moving-key step-${step}`}>20</span>
      <Cells
        active={step === 0 ? "20" : undefined}
        values={step < 2 ? ["20", "30", "40"] : ["30", "40"]}
        tone="leaf"
      />
    </div>
    <small>{["underflow", "borrow from the right", "repair complete"][step]}</small>
  </div>
);

const Merge = (step: number) => (
  <div className="repair-viz merge">
    <p>
      {step < 2 ? (
        <>
          Parent separator <b>20</b>
        </>
      ) : (
        "One leaf survives; the other page returns to the freelist."
      )}
    </p>
    <div className="viz-leaf-row">
      <Cells
        values={step < 2 ? ["10"] : ["10", "20", "30"]}
        tone="leaf"
      />
      {step < 2 && <span className={step === 1 ? "separator-drop" : ""}>20</span>}
      {step < 2 && <Cells values={["20", "30"]} tone="leaf" />}
    </div>
    <small>{["underflow", "merge siblings", "parent entry removed"][step]}</small>
  </div>
);

const Offset = (step: number) => {
  const page = [1, 12, 27][step];
  return (
    <div className="offset-viz">
      <span>page {page}</span>
      <b>× 4096</b>
      <strong>{(page * 4096).toLocaleString()} byte offset</strong>
      <div className="offset-ruler" aria-hidden="true">
        <i style={{ width: `${20 + step * 28}%` }} />
      </div>
    </div>
  );
};

const FileLayout = (step: number) => {
  const pages = [
    ["0", "database header"],
    ["1", "internal B+ page"],
    ["2", "leaf B+ page"],
    ["3", "free page"],
  ];
  return (
    <div className="file-layout">
      <p>database file</p>
      <div>
        {pages.map(([number, label], index) => (
          <Page active={index === step} key={number} label={`page ${number}`}>
            <span>{label}</span>
          </Page>
        ))}
      </div>
    </div>
  );
};

const SlottedPage = (step: number) => (
  <div className="slotted-page">
    <div className="slot-segment header">page header</div>
    <div
      className="slot-segment directory"
      style={{ flexGrow: 1 + Math.min(step, 2) }}
    >
      cell directory →
    </div>
    <div className="slot-segment free">free space</div>
    <div
      className="slot-segment cells"
      style={{ flexGrow: 1 + Math.max(0, step - 1) }}
    >
      ← packed cells
    </div>
    <p>low byte offsets</p>
    <p>high byte offsets</p>
  </div>
);

const ByteLayout = (
  labels: string[],
  step: number,
  title: string,
  compact = false,
) => (
  <div className={`byte-layout ${compact ? "compact" : ""}`}>
    <p>{title}</p>
    <div>
      {labels.map((label, index) => (
        <span className={index === step ? "active" : ""} key={label}>
          {label}
        </span>
      ))}
    </div>
  </div>
);

const VariableRecords = (step: number) => {
  const keys = ["5", "12", "31"];
  return (
    <div className="variable-records">
      <div className="record-directory">
        <p>logical order</p>
        {keys.map((key, index) => (
          <span className={index === step ? "active" : ""} key={key}>
            key {key} <b>offset {["88", "26", "52"][index]}</b>
          </span>
        ))}
      </div>
      <div className="record-cells">
        <p>physical placement</p>
        {["12", "31", "5"].map((key) => (
          <span className={key === keys[step] ? "active" : ""} key={key}>
            {key}
            <i style={{ width: `${28 + Number(key)}px` }} />
          </span>
        ))}
      </div>
    </div>
  );
};

const Freelist = (step: number) => {
  const labels = step === 2 ? ["7", "42"] : ["18", "7", "42"];
  return (
    <div className="freelist-viz">
      <Page label="database header">
        <span>free head → {labels[0]}</span>
      </Page>
      <b aria-hidden="true">→</b>
      <div className="freelist-pages">
        {labels.map((label, index) => (
          <Page active={step === 1 && index === 0} key={label} label={`page ${label}`}>
            <span>free</span>
          </Page>
        ))}
      </div>
      <p>{["available pages", "allocate page 18", "head advances to page 7"][step]}</p>
    </div>
  );
};

const Timeline = ({
  step,
  labels,
}: {
  step: number;
  labels: string[];
}) => (
  <div className="timeline-viz">
    {labels.map((label, index) => (
      <div className={index <= step ? "complete" : ""} key={label}>
        <span>{index + 1}</span>
        <p>{label}</p>
      </div>
    ))}
  </div>
);

const specs: VisualSpec[] = [
  {
    title: "A balanced binary search tree",
    description: "The search for 6 reaches its target in three comparisons.",
    steps: 3,
    render: (step) => BalancedTree(step),
  },
  {
    title: "The same idea, without balance",
    description: "Sorted inserts turn the tree into a linear chain.",
    steps: 4,
    render: (step) => BalancedTree(step, true),
  },
  {
    title: "Anatomy of a B+ tree",
    description:
      "Separator keys route the search; complete key-value records remain in the leaves.",
    steps: 6,
    render: BPlusAnatomy,
  },
  {
    title: "Descending from root to leaf",
    description: "Searching for 31 follows one page at each level.",
    steps: 6,
    render: SearchFlow,
  },
  {
    title: "Wide nodes keep the tree short",
    description: "An order-100 tree can address billions of keys in five levels.",
    steps: 5,
    render: BPlusCapacity,
  },
  {
    title: "A binary tree needs more levels",
    description: "The asymptotic complexity matches, but the page-read count does not.",
    steps: 6,
    render: PageReadComparison,
  },
  {
    title: "Leaf split; parent has room",
    description:
      "The new separator fits in the parent, so the repair stops after one leaf split.",
    steps: 4,
    render: LeafSplitWithRoom,
  },
  {
    title: "Leaf split; parent has room",
    description:
      "The new separator fits in the parent, so the repair stops after one leaf split.",
    steps: 4,
    render: LeafSplitWithRoom,
  },
  {
    title: "The next split reaches the root",
    description:
      "A full leaf, parent, and root split in sequence, creating one new tree level.",
    steps: 6,
    render: CascadingTreeSplit,
  },
  {
    title: "Repair by borrowing",
    description: "Moving one entry also changes the parent's routing separator.",
    steps: 3,
    render: Borrow,
  },
  {
    title: "Repair by merging",
    description: "When neither sibling can spare an entry, two leaves become one.",
    steps: 3,
    render: Merge,
  },
  {
    title: "Pages turn pointers into durable addresses",
    description: "A page number resolves to the same byte range after a restart.",
    steps: 3,
    render: Offset,
  },
  {
    title: "The database is a sequence of pages",
    description: "Page zero identifies the file and points to the current root.",
    steps: 4,
    render: FileLayout,
  },
  {
    title: "A slotted page grows inward",
    description:
      "Offsets stay ordered at the front while variable-size records pack from the back.",
    steps: 4,
    render: SlottedPage,
  },
  {
    title: "Leaf-page header",
    description: "Seven bytes describe the page and the boundaries of its free space.",
    steps: 4,
    render: (step) =>
      ByteLayout(
        ["type · 1B", "key count · 2B", "free start · 2B", "free end · 2B"],
        step,
        "7 bytes",
      ),
  },
  {
    title: "Leaf cell",
    description: "Type and length fields let keys and values vary in size.",
    steps: 6,
    render: (step) =>
      ByteLayout(
        ["key type", "key size", "encoded key", "value type", "value size", "value"],
        step,
        "variable length",
        true,
      ),
  },
  {
    title: "Internal-page header",
    description: "The leftmost child lives in the header because no separator precedes it.",
    steps: 5,
    render: (step) =>
      ByteLayout(
        ["type", "key count", "free start", "free end", "leftmost child · 4B"],
        step,
        "11 bytes",
        true,
      ),
  },
  {
    title: "Internal cell",
    description: "Every other child is stored beside the separator to its left.",
    steps: 4,
    render: (step) =>
      ByteLayout(
        ["key type", "key size", "separator key", "right child · 4B"],
        step,
        "routing cell",
        true,
      ),
  },
  {
    title: "Logical order, physical freedom",
    description: "The directory stays sorted even when records are packed elsewhere.",
    steps: 3,
    render: VariableRecords,
  },
  {
    title: "Freed pages are reused",
    description: "Allocation removes the freelist head before growing the file.",
    steps: 3,
    render: Freelist,
  },
  {
    title: "An insertion reaches several pages",
    description: "The tree chooses what changes; the pager tracks every dirty page.",
    steps: 7,
    interval: 1050,
    render: (step) => (
      <Timeline
        labels={[
          "Descend to leaf page 12",
          "Begin writing page 12",
          "Insert and detect overflow",
          "Allocate page 27",
          "Split pages 12 and 27",
          "Begin writing parent page 4",
          "Insert the new separator",
        ]}
        step={step}
      />
    ),
  },
  {
    title: "The rollback-journal commit",
    description: "Old page images become durable before the database file changes.",
    steps: 5,
    interval: 1250,
    render: (step) => (
      <Timeline
        labels={[
          "Save old page images",
          "Write and sync the journal",
          "Write dirty database pages",
          "Sync the database file",
          "Truncate the journal",
        ]}
        step={step}
      />
    ),
  },
];

export const ArticleVisual = ({ index }: { index: number }) => {
  const spec = specs[index];
  const { ref, step } = useAutoplayStep(
    spec.steps,
    spec.interval ?? 1450,
  );

  return (
    <figure
      className="article-visual"
      ref={ref as React.RefObject<HTMLElement>}
      aria-label={`${spec.title}. ${spec.description}`}
    >
      <figcaption>
        <div>
          <strong>{spec.title}</strong>
          <span>{spec.description}</span>
        </div>
        <div className="viz-progress" aria-hidden="true">
          {Array.from({ length: spec.steps }, (_, index) => (
            <i className={index === step ? "active" : ""} key={index} />
          ))}
        </div>
      </figcaption>
      <div className="article-visual-stage">{spec.render(step)}</div>
    </figure>
  );
};
