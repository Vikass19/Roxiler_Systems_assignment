
import { useState, useEffect, useCallback } from "react";
import {
  fetchUsers,
  fetchStores,
  fetchStoreRatings,
} from "../api/apis";

export default function useAdminData() {
  const [stats, setStats] = useState({
    users: 0,
    stores: 0,
    ratings: 0,
  });

  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [usersData, storesData] = await Promise.all([
        fetchUsers(),
        fetchStores(),
      ]);

      setUsers(usersData);
      setStores(storesData);

      const ratingsData = await Promise.all(
        storesData.map((store) =>
          fetchStoreRatings(store.id)
        )
      );

      const totalRatings = ratingsData.reduce(
        (total, ratings) => total + (ratings.length || 0),
        0
      );

      setStats({
        users: usersData.length,
        stores: storesData.length,
        ratings: totalRatings,
      });
    } catch (err) {
      console.error("Admin fetch error:", err);

      setError(
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    stats,
    users,
    stores,
    loading,
    error,
    refresh: fetchData,
  };
}