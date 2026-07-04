// ======================================================
// src/services/googleSheet.js
// PART 1
// ======================================================

const SHEET_ID =
  "1k1LKv1Mfw4reO7sCkL1mk2bqlBnHnr-I5PqDRNBXCXg";

// ------------------------------------------------------
// Main Village Sheet
// ------------------------------------------------------

const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

// ------------------------------------------------------
// Coverage Sheet
// ------------------------------------------------------

const COVERAGE_SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Coverage`;

// ------------------------------------------------------
// Cache
// ------------------------------------------------------

const CACHE_KEY =
  "hvdp_google_sheet_cache_v1";

const CACHE_TIME_KEY =
  "hvdp_google_sheet_cache_time";

const COVERAGE_CACHE_KEY =
  "hvdp_google_sheet_coverage_cache_v1";

const COVERAGE_CACHE_TIME_KEY =
  "hvdp_google_sheet_coverage_cache_time";

const CACHE_DURATION =
  1000 * 60 * 5;

// ------------------------------------------------------
// Memory Cache
// ------------------------------------------------------

let memoryCache = null;

let coverageMemoryCache = null;

let loadingPromise = null;

let coverageLoadingPromise = null;

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
      .replace(
        "google.visualization.Query.setResponse(",
        ""
      )
      .slice(0, -2)

  );

  return json.table;

}

function getCell(row, index) {

  if (!row.c[index]) {

    return "";

  }

  return normalize(
    row.c[index].v
  );

}

// ------------------------------------------------------
// Convert Village Rows
// ------------------------------------------------------

function convertRows(table) {

  return table.rows.map((row) => ({

    district: getCell(row, 0),

    tehsil: getCell(row, 1),

    village: getCell(row, 2),

    code: getCell(row, 3),

    link: getCell(row, 4),

    updated: row.c[5]?.v || "",

  }));

}

// ------------------------------------------------------
// Session Cache
// ------------------------------------------------------

function loadSessionCache(
  key,
  timeKey
) {

  try {

    const data =
      sessionStorage.getItem(key);

    const time =
      Number(
        sessionStorage.getItem(timeKey)
      );

    if (!data || !time) {

      return null;

    }

    if (
      Date.now() - time >
      CACHE_DURATION
    ) {

      sessionStorage.removeItem(key);

      sessionStorage.removeItem(timeKey);

      return null;

    }

    return JSON.parse(data);

  }

  catch {

    return null;

  }

}

function saveSessionCache(
  key,
  timeKey,
  data
) {

  try {

    sessionStorage.setItem(

      key,

      JSON.stringify(data)

    );

    sessionStorage.setItem(

      timeKey,

      String(Date.now())

    );

  }

  catch {

    // Ignore

  }

}

// ------------------------------------------------------
// Download Village Sheet
// ------------------------------------------------------

async function downloadSheet() {

  const response =
    await fetch(

      SHEET_URL,

      {

        cache:"no-store",

      }

    );

  if (!response.ok) {

    throw new Error(

      "Unable to fetch Google Sheet."

    );

  }

  const text =
    await response.text();

  const table =
    parseGoogleResponse(text);

  return convertRows(table);

}
// ------------------------------------------------------
// Download Coverage Sheet
// ------------------------------------------------------

async function downloadCoverageSheet() {

  const response =
    await fetch(

      COVERAGE_SHEET_URL,

      {

        cache: "no-store",

      }

    );

  if (!response.ok) {

    throw new Error(

      "Unable to fetch Coverage Sheet."

    );

  }

  const text =
    await response.text();

  const table =
    parseGoogleResponse(text);

  const data = {};

  table.rows.forEach((row) => {

    const key =
      getCell(row,0);

    const value =
      getCell(row,1);

    data[key] = value;

  });

  return {

    totalDistricts:

      Number(
        data["Total Districts"] || 0
      ),

    districtsLive:

      Number(
        data["Districts Live"] || 0
      ),

    totalTehsils:

      Number(
        data["Total Tehsils / Sub-Tehsils"] || 0
      ),

    tehsilsLive:

      Number(
        data["Tehsils / Sub-Tehsils Live"] || 0
      ),

    totalVillages:

      Number(
        data["Total Villages"] || 0
      ),

    villagesLive:

      Number(
        data["Villages Live"] || 0
      ),

    digitalCoverage:

      Number(
        data["Digital Coverage"] || 0
      ),

  };

}

// ------------------------------------------------------
// Main Loader
// ------------------------------------------------------

export async function loadSheet() {

  if (memoryCache) {

    return memoryCache;

  }

  const sessionCache =
    loadSessionCache(

      CACHE_KEY,

      CACHE_TIME_KEY

    );

  if (sessionCache) {

    memoryCache =
      sessionCache;

    return sessionCache;

  }

  if (loadingPromise) {

    return loadingPromise;

  }

  loadingPromise = (async () => {

    const data =
      await downloadSheet();

    memoryCache = data;

    saveSessionCache(

      CACHE_KEY,

      CACHE_TIME_KEY,

      data

    );

    loadingPromise = null;

    return data;

  })();

  return loadingPromise;

}

// ------------------------------------------------------
// Coverage Loader
// ------------------------------------------------------

export async function loadCoverage() {

  if (coverageMemoryCache) {

    return coverageMemoryCache;

  }

  const sessionCache =
    loadSessionCache(

      COVERAGE_CACHE_KEY,

      COVERAGE_CACHE_TIME_KEY

    );

  if (sessionCache) {

    coverageMemoryCache =
      sessionCache;

    return sessionCache;

  }

  if (coverageLoadingPromise) {

    return coverageLoadingPromise;

  }

  coverageLoadingPromise = (async () => {

    const data =
      await downloadCoverageSheet();

    coverageMemoryCache =
      data;

    saveSessionCache(

      COVERAGE_CACHE_KEY,

      COVERAGE_CACHE_TIME_KEY,

      data

    );

    coverageLoadingPromise =
      null;

    return data;

  })();

  return coverageLoadingPromise;

}
// ======================================================
// Districts
// ======================================================

export async function getDistricts() {

  const rows =
    await loadSheet();

  return [

    ...new Set(

      rows.map(

        row => row.district

      )

    )

  ]

  .filter(Boolean)

  .sort(

    (a,b)=>

    a.localeCompare(b)

  );

}

// ======================================================
// Tehsils
// ======================================================

export async function getTehsils(
  district
) {

  if(!district){

    return [];

  }

  const rows =
    await loadSheet();

  return [

    ...new Set(

      rows

      .filter(

        row=>

        lower(row.district)===

        lower(district)

      )

      .map(

        row=>row.tehsil

      )

    )

  ]

  .filter(Boolean)

  .sort(

    (a,b)=>

    a.localeCompare(b)

  );

}

// ======================================================
// Villages
// ======================================================

export async function getVillages(

  district,

  tehsil

){

  if(

    !district ||

    !tehsil

  ){

    return [];

  }

  const rows =
    await loadSheet();

  return rows

  .filter(

    row=>

    lower(row.district)===

    lower(district)

    &&

    lower(row.tehsil)===

    lower(tehsil)

  )

  .sort(

    (a,b)=>

    a.village.localeCompare(

      b.village

    )

  );

}

// ======================================================
// Village Count
// ======================================================

export async function getVillageCounts(
  district
){

  if(!district){

    return {};

  }

  const rows =
    await loadSheet();

  const counts={};

  rows.forEach(

    row=>{

      if(

        lower(row.district)!==

        lower(district)

      ){

        return;

      }

      counts[row.tehsil]=

      (counts[row.tehsil]||0)+1;

    }

  );

  return counts;

}

// ======================================================
// Village By Code
// ======================================================

export async function getVillage(
  code
){

  if(!code){

    return null;

  }

  const rows=
    await loadSheet();

  return(

    rows.find(

      row=>

      normalize(row.code)===

      normalize(code)

    )||null

  );

}

// ======================================================
// Search
// ======================================================

export async function searchVillages(
  keyword
){

  const query=
    lower(keyword);

  if(!query){

    return[];

  }

  const rows=
    await loadSheet();

  return rows

  .filter(

    row=>

    lower(row.village)

    .includes(query)

    ||

    lower(row.code)

    .includes(query)

  )

  .sort(

    (a,b)=>

    a.village.localeCompare(

      b.village

    )

  );

}

// ======================================================
// Coverage
// ======================================================

export async function getCoverage(){

  return loadCoverage();

}
// ------------------------------------------------------
// Recent Updates
// ------------------------------------------------------

export async function getRecentUpdates() {

  const rows = await loadSheet();

  return rows

    .filter(
      row => row.link && row.updated
    )

    .sort(
      (a, b) =>
        Number(b.updated) -
        Number(a.updated)
    )

    .slice(0, 6)

    .map(row => ({

      district: row.district,

      tehsil: row.tehsil,

      village: row.village,

      code: row.code,

      updated: row.updated,

    }));

}
// ======================================================
// Utilities
// ======================================================

export function clearSheetCache(){

  memoryCache=null;

  coverageMemoryCache=null;

  sessionStorage.removeItem(

    CACHE_KEY

  );

  sessionStorage.removeItem(

    CACHE_TIME_KEY

  );

  sessionStorage.removeItem(

    COVERAGE_CACHE_KEY

  );

  sessionStorage.removeItem(

    COVERAGE_CACHE_TIME_KEY

  );

}

export async function refreshSheet(){

  clearSheetCache();

  return loadSheet();

}

export async function refreshCoverage(){

  clearSheetCache();

  return loadCoverage();

}

export async function getAllVillages(){

  return loadSheet();

}

// ======================================================
// END
// ======================================================