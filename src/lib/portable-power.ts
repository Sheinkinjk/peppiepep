// Single source of truth for the portable-power range and prices.
//
// Every figure was read off the brand's own Australian store on 24 August 2026,
// never an aggregator and never a US price converted. That is the fact these
// pages own: almost everything published about these brands quotes USD or an
// undated sale price, so a directly comparable AUD cost-per-watt-hour table does
// not otherwise exist for Australian buyers.
//
// EcoFlow's prices were on sale when read, and the regular price is recorded
// alongside so the comparison cannot quietly flatter them. Anker showed no
// struck-through price on the models below.

export const PRICES_READ_ON = "24 August 2026";

export type PowerStation = {
  brand: "EcoFlow" | "Anker SOLIX";
  model: string;
  /** Usable capacity in watt-hours, as published by the brand. */
  wh: number;
  /** Continuous AC output in watts. */
  watts: number;
  /** Price in AUD at the time it was read. */
  aud: number;
  /** Struck-through regular price where the store showed one. */
  wasAud?: number;
};

export const STATIONS: PowerStation[] = [
  // EcoFlow — au.ecoflow.com/collections/portable-power-stations
  { brand: "EcoFlow", model: "RIVER 3", wh: 245, watts: 300, aud: 299, wasAud: 419 },
  { brand: "EcoFlow", model: "RIVER 3 Plus", wh: 286, watts: 600, aud: 449, wasAud: 499 },
  { brand: "EcoFlow", model: "DELTA 3 Classic", wh: 1024, watts: 1800, aud: 999, wasAud: 1199 },
  { brand: "EcoFlow", model: "DELTA 3", wh: 1024, watts: 1800, aud: 1099, wasAud: 1499 },
  { brand: "EcoFlow", model: "DELTA 3 Plus", wh: 1024, watts: 1800, aud: 1199, wasAud: 1599 },
  { brand: "EcoFlow", model: "DELTA 2 Max", wh: 2048, watts: 2400, aud: 2099, wasAud: 2599 },
  { brand: "EcoFlow", model: "DELTA 3 Max Plus", wh: 2048, watts: 3000, aud: 2599, wasAud: 2999 },
  { brand: "EcoFlow", model: "DELTA 3 Ultra Plus", wh: 3072, watts: 3600, aud: 2999, wasAud: 3499 },
  { brand: "EcoFlow", model: "DELTA Pro", wh: 3600, watts: 3600, aud: 2999, wasAud: 3999 },
  { brand: "EcoFlow", model: "DELTA Pro 3", wh: 4096, watts: 4000, aud: 4299, wasAud: 4999 },
  { brand: "EcoFlow", model: "DELTA Pro Ultra", wh: 6144, watts: 6900, aud: 7299 },
  // Anker SOLIX — ankersolix.com/au/collections/power-stations
  { brand: "Anker SOLIX", model: "C300 DC", wh: 288, watts: 300, aud: 449 },
  { brand: "Anker SOLIX", model: "C300", wh: 288, watts: 300, aud: 549 },
  { brand: "Anker SOLIX", model: "C800 Plus", wh: 768, watts: 1200, aud: 1099 },
  { brand: "Anker SOLIX", model: "C1000", wh: 1056, watts: 1800, aud: 1499 },
  { brand: "Anker SOLIX", model: "C1000 Gen 2", wh: 1024, watts: 2000, aud: 1599 },
  { brand: "Anker SOLIX", model: "C2000 Gen 2", wh: 2048, watts: 2400, aud: 2699 },
  { brand: "Anker SOLIX", model: "F3800", wh: 3840, watts: 6000, aud: 5399 },
];

/** Cost per watt-hour, the only figure that makes different capacities comparable. */
export const perWh = (s: PowerStation) => s.aud / s.wh;
export const fmtPerWh = (s: PowerStation) => `$${perWh(s).toFixed(2)}/Wh`;
export const fmtAud = (n: number) => `A$${n.toLocaleString("en-AU")}`;

/** Models at the same capacity, which is where a comparison is actually fair. */
export const MATCHED_PAIRS: { wh: number; label: string }[] = [
  { wh: 288, label: "Around 250-300Wh" },
  { wh: 1024, label: "Around 1,000Wh" },
  { wh: 2048, label: "Around 2,000Wh" },
];

/**
 * What a given capacity realistically runs, using typical Australian appliance
 * draw. Deliberately conservative: real runtime is lower than capacity divided
 * by draw, because inverters lose energy and fridges cycle.
 */
export const RUNS = [
  { appliance: "Wi-Fi router and a phone charger", watts: 20, note: "The bare minimum to stay contactable." },
  { appliance: "Laptop, on and working", watts: 60, note: "A full working day is well within a 1,000Wh unit." },
  { appliance: "Fridge-freezer (cycling average)", watts: 100, note: "Cycles on and off, so it draws far less than its nameplate." },
  { appliance: "CPAP machine, humidifier off", watts: 40, note: "The reason many people buy one at all." },
  { appliance: "Microwave or kettle", watts: 1200, note: "Brief bursts only. Check the unit's output, not its capacity." },
  { appliance: "Portable air conditioner", watts: 1000, note: "Needs high output and drains a small unit in under an hour." },
];
