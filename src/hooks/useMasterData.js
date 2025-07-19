import { useEffect, useState } from "react";
import { masterService } from "@/services/masterService";

export const useMasterData = () => {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [custRes, itemRes, unitRes] = await Promise.all([masterService.getCustomers(), masterService.getItems(), masterService.getUnits()]);

        setCustomers(custRes?.success ? custRes.data : []);
        setItems(itemRes?.success ? itemRes.data : []);
        setUnits(unitRes?.success ? unitRes.data : []);
      } catch (err) {
        console.error("Gagal memuat data master:", err);
        setCustomers([]);
        setItems([]);
        setUnits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMasterData();
  }, []);

  return { customers, items, units, loading };
};
