import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Hero from "../components/Hero";
import BrowseSearch from "../components/BrowseSearch";
import CoverageSection from "../components/CoverageSection";
import FilterSection from "../components/FilterSection";
import DistrictCards from "../components/DistrictCards";
import VillageGrid from "../components/VillageGrid";
import Footer from "../components/Footer";

import {
  getDistricts,
  getTehsils,
  getVillages,
  searchVillages,
  getVillageCounts,
} from "../services/googleSheet";

import "../styles/Home.css";

function Home() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [districts, setDistricts] = useState([]);

  const [tehsils, setTehsils] = useState([]);

  const [villages, setVillages] = useState([]);

  const [villageCounts, setVillageCounts] = useState({});

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [selectedTehsil, setSelectedTehsil] = useState("");

  const [selectedVillage, setSelectedVillage] = useState("");

  const [search, setSearch] = useState("");

  const DEFAULT_DISTRICT = "Charkhi Dadri";

  const DEFAULT_TEHSIL = "Charkhi Dadri";

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {

    setLoading(true);

    const districtList = await getDistricts();

    setDistricts(districtList);

    const district =
      districtList.includes(DEFAULT_DISTRICT)
        ? DEFAULT_DISTRICT
        : districtList[0];

    setSelectedDistrict(district);

    const tehsilList =
      await getTehsils(district);

    setTehsils(tehsilList);

    const tehsil =
      tehsilList.includes(DEFAULT_TEHSIL)
        ? DEFAULT_TEHSIL
        : tehsilList[0];

    setSelectedTehsil(tehsil);

    const villageList =
      await getVillages(district, tehsil);

    setVillages(villageList);

    const counts =
      await getVillageCounts(district);

    setVillageCounts(counts);

    setLoading(false);

  }

  async function handleDistrictChange(district) {

    setSelectedDistrict(district);
setIsSearching(false);

setSearchResults([]);
    setSelectedVillage("");

    const tehsilList =
      await getTehsils(district);

    setTehsils(tehsilList);

    if (!tehsilList.length) {

      setSelectedTehsil("");

      setVillages([]);

      setVillageCounts({});

      return;

    }

    const firstTehsil =
      tehsilList[0];

    setSelectedTehsil(firstTehsil);

    const villageList =
      await getVillages(
        district,
        firstTehsil
      );

    setVillages(villageList);

    const counts =
      await getVillageCounts(district);

    setVillageCounts(counts);

    scrollToVillages();

  }

  async function handleTehsilChange(tehsil) {

    setSelectedTehsil(tehsil);
setIsSearching(false);

setSearchResults([]);
    setSelectedVillage("");

    const villageList =
      await getVillages(
        selectedDistrict,
        tehsil
      );

    setVillages(villageList);

    scrollToVillages();

  }

  function handleVillageChange(villageCode) {

    setSelectedVillage(villageCode);

    if (!villageCode) return;

    navigate(`/village/${villageCode}`);

  }

  async function handleSearch(keyword) {

  const data =
    await searchVillages(keyword);

  setSearchResults(data);

  setIsSearching(true);

  scrollToVillages();

}

  function scrollToVillages() {

    setTimeout(() => {

      const section =
        document.getElementById("village-grid");

      if (section) {

        section.scrollIntoView({

          behavior: "smooth",

          block: "start",

        });

      }

    }, 100);

  }

  if (loading) {

    return (
      <>
        <Header />

        <main className="home-page">

          <div className="container">

            <div className="loading-card">

              <h2>Loading Villages...</h2>

            </div>

          </div>

        </main>

        <Footer />

      </>
    );

  }

  return (

    <>

      <Header />

      <Hero />


<main className="home-page">

        <div className="container">

          <BrowseSearch

  onSearch={handleSearch}

/>

          <FilterSection
            districts={districts}
            tehsils={tehsils}
            villages={villages}
            selectedDistrict={selectedDistrict}
            selectedTehsil={selectedTehsil}
            selectedVillage={selectedVillage}
            onDistrictChange={handleDistrictChange}
            onTehsilChange={handleTehsilChange}
            onVillageChange={handleVillageChange}
          />

          <DistrictCards
            district={selectedDistrict}
            tehsils={tehsils}
            selectedTehsil={selectedTehsil}
            onSelectTehsil={handleTehsilChange}
            villageCounts={villageCounts}
          />

          <VillageGrid

  title={
    isSearching
      ? "Search Results"
      : `Villages in ${selectedTehsil} Tehsil`
  }

  villages={
    isSearching
      ? searchResults
      : villages
  }

/>

        </div>

      </main>

      <Footer />

    </>

  );

}

export default Home;