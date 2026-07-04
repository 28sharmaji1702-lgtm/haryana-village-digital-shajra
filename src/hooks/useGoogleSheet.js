import { useEffect, useState } from "react";

import {
  loadSheet,
  getDistricts,
  getTehsils,
  getVillages,
  searchVillages,
  getVillage,
} from "../services/googleSheet";

export default function useGoogleSheet() {
  const [loading, setLoading] = useState(true);

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    setLoading(true);

    try {
      await loadSheet();

      const districtList = await getDistricts();

      setDistricts(districtList);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    districts,
    getTehsils,
    getVillages,
    searchVillages,
    getVillage,
    refresh: initialize,
  };
}