import type { Cell, EvalRow } from "@/components/EvaluationTable";

// Table 1
export const modelArchitectures: [string, string, string, string][] = [
  ["Qwen3-VL-2B-Instruct", "1256M", "34.865K", "2.77%"],
  ["Qwen3-VL-8B-Instruct", "5095M", "87.294K", "1.71%"],
  ["Qwen3.5-4B", "2632M", "42.467K", "1.61%"],
  ["Qwen3.5-9B", "5783M", "58.196K", "1.01%"],
  ["SmolVLM2-256M-Video-Instruct", "167M", "9.769K", "5.84%"],
  ["SmolVLM2-500M-Video-Instruct", "319M", "17.367K", "5.44%"],
];

// Table 2
export const metrics = ["Cov", "Cor", "Hal", "Tone", "Ovr"] as const;

// prettier-ignore
export const rows: EvalRow[] = [
  ["Qwen3-VL-2B-Instruct",
    [["2.47",""],["1.99",""],["1.83",""],["1.80",""],["2.02",""]] satisfies Cell[],
    [["2.55",""],["2.07",""],["1.99",""],["3.04","hi"],["2.41",""]] satisfies Cell[],
    [["+0.08",""],["+0.08",""],["+0.16",""],["+1.24",""],["+0.39",""]] satisfies Cell[]],
  ["Qwen3-VL-8B-Instruct",
    [["2.89","hi"],["2.22","hi"],["1.86","hi"],["1.96","hi"],["2.23","hi"]] satisfies Cell[],
    [["2.47",""],["1.95",""],["1.83",""],["2.85",""],["2.28",""]] satisfies Cell[],
    [["−0.42","lo"],["−0.27","lo"],["−0.03",""],["+0.90","lo"],["+0.05","lo"]] satisfies Cell[]],
  ["Qwen3.5-4B",
    [["2.75",""],["2.04",""],["1.70",""],["1.75",""],["2.06",""]] satisfies Cell[],
    [["2.54",""],["2.06",""],["2.0",""],["2.90",""],["2.37",""]] satisfies Cell[],
    [["−0.21",""],["+0.02",""],["+0.30",""],["+1.15",""],["+0.31",""]] satisfies Cell[]],
  ["Qwen3.5-9B",
    [["2.75",""],["2.05",""],["1.53",""],["1.63",""],["1.99",""]] satisfies Cell[],
    [["2.62","hi"],["2.16","hi"],["2.09","hi"],["3.01",""],["2.47","hi"]] satisfies Cell[],
    [["−0.13",""],["+0.11",""],["+0.56","hi"],["+1.38",""],["+0.48",""]] satisfies Cell[]],
  ["SmolVLM2-256M-Video-Instruct",
    [["1.27","lo"],["1.32","lo"],["1.44",""],["1.32",""],["1.34","lo"]] satisfies Cell[],
    [["1.89","lo"],["1.36","lo"],["1.34","lo"],["2.52","lo"],["1.78","lo"]] satisfies Cell[],
    [["+0.62","hi"],["+0.04",""],["−0.10","lo"],["+1.20",""],["+0.44",""]] satisfies Cell[]],
  ["SmolVLM2-500M-Video-Instruct",
    [["1.46",""],["1.39",""],["1.41","lo"],["1.16","lo"],["1.36",""]] satisfies Cell[],
    [["2.06",""],["1.57",""],["1.48",""],["2.76",""],["1.97",""]] satisfies Cell[],
    [["+0.60",""],["+0.18","hi"],["+0.06",""],["+1.60","hi"],["+0.61","hi"]] satisfies Cell[]],
];
