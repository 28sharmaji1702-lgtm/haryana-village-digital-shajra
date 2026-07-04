// ======================================================
// src/services/googleSheet.js
// PART 1
// ======================================================

const SHEET_ID = "1k1LKv1Mfw4reO7sCkL1mk2bqlBnHnr-I5PqDRNBXCXg";

const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

const CACHE_KEY = "hvdp_google_sheet_cache_v1";

const CACHE_TIME_KEY = "hvdp_google_sheet_cache_time";

const CACHE_DURATION = 1000 * 60 * 5;

let memoryCache = null;

let loadingPromise = null;

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

function normalize(value) {
  return String(value ?? "").trim();
}

function lower(value) {
  return normalize(value).toLowerCase();
}

function parseGoogleResponse(text) {
  const json = JSON.parse(
    text
      .replace("/*O_o*/", "")
      .replace("google.visualization.Query.setResponse(", "")
      .slice(0, -2)
  );

  return json.table;
}

function getCell(row, index) {
  if (!row.c[index]) return "";

  return normalize(row.c[index].v);
}

// ------------------------------------------------------
// Convert Google Sheet rows
// ------------------------------------------------------

function convertRows(table) {
  return table.rows.map((row) => ({
    district: getCell(row, 0),
    tehsil: getCell(row, 1),
    village: getCell(row, 2),
    code: getCell(row, 3),
    link: getCell(row, 4),
  }));
}

// ------------------------------------------------------
// Cache
// ------------------------------------------------------

function loadSessionCache() {
  try {
    const data = sessionStorage.getItem(CACHE_KEY);

    const time = Number(
      sessionStorage.getItem(CACHE_TIME_KEY)
    );

    if (!data || !time) {
      return null;
    }

    if (Date.now() - time > CACHE_DURATION) {
      sessionStorage.removeItem(CACHE_KEY);
      sessionStorage.removeItem(CACHE_TIME_KEY);

      return null;
    }

    return JSON.parse(data);
  } catch {
    return null;
  }
}

function saveSessionCache(data) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify(data)
    );

    sessionStorage.setItem(
      CACHE_TIME_KEY,
      String(Date.now())
    );
  } catch {
    // Ignore storage errors
  }
}

// ------------------------------------------------------
// Download Sheet
// ------------------------------------------------------

async function downloadSheet() {
  const response = await fetch(SHEET_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch Google Sheet.");
  }

  const text = await response.text();

  const table = parseGoogleResponse(text);

  return convertRows(table);
}

// ------------------------------------------------------
// Main Loader
// ------------------------------------------------------

export async function loadSheet() {
  if (memoryCache) {
    return memoryCache;
  }

  const sessionCache = loadSessionCache();

  if (sessionCache) {
    memoryCache = sessionCache;
    return sessionCache;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    const data = await downloadSheet();

    memoryCache = data;

    saveSessionCache(data);

    loadingPromise = null;

    return data;
  })();

  return loadingPromise;
}

// ======================================================
// PART 1 END
// Continue with PART 2
// ======================================================
// ======================================================
// PART 2
// ======================================================

// ------------------------------------------------------
// Districts
// ------------------------------------------------------

export async function getDistricts() {
  const rows = await loadSheet();

  return [...new Set(rows.map((row) => row.district))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

// ------------------------------------------------------
// Tehsils
// ------------------------------------------------------

export async function getTehsils(district) {
  if (!district) return [];

  const rows = await loadSheet();

  return [
    ...new Set(
      rows
        .filter(
          (row) => lower(row.district) === lower(district)
        )
        .map((row) => row.tehsil)
    ),
  ]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

// ------------------------------------------------------
// Villages
// ------------------------------------------------------

export async function getVillages(
  district,
  tehsil
) {
  if (!district || !tehsil) {
    return [];
  }

  const rows = await loadSheet();

  return rows
    .filter(
      (row) =>
        lower(row.district) === lower(district) &&
        lower(row.tehsil) === lower(tehsil)
    )
    .sort((a, b) =>
      a.village.localeCompare(b.village)
    );
}
// ------------------------------------------------------
// Village Count by Tehsil
// ------------------------------------------------------

export async function getVillageCounts(district) {

  if (!district) {
    return {};
  }

  const rows = await loadSheet();

  const counts = {};

  rows.forEach((row) => {

    if (lower(row.district) !== lower(district)) {
      return;
    }

    counts[row.tehsil] =
      (counts[row.tehsil] || 0) + 1;

  });

  return counts;

}
// ------------------------------------------------------
// Village By Code
// ------------------------------------------------------

export async function getVillage(code) {
  if (!code) return null;

  const rows = await loadSheet();

  return (
    rows.find(
      (row) => normalize(row.code) === normalize(code)
    ) || null
  );
}

// ------------------------------------------------------
// Search
// ------------------------------------------------------

export async function searchVillages(keyword) {
  const query = lower(keyword);

  if (!query) {
    return [];
  }

  const rows = await loadSheet();

  return rows
    .filter((row) => {
      return (
        lower(row.village).includes(query) ||
        lower(row.code).includes(query)
      );
    })
    .sort((a, b) =>
      a.village.localeCompare(b.village)
    );
}

// ======================================================
// Utility Functions
// ======================================================

export function clearSheetCache() {
  memoryCache = null;

  sessionStorage.removeItem(CACHE_KEY);

  sessionStorage.removeItem(CACHE_TIME_KEY);
}

export async function refreshSheet() {
  clearSheetCache();

  return loadSheet();
}

export async function getAllVillages() {
  return loadSheet();
}

// ======================================================
// END OF googleSheet.js
// ======================================================