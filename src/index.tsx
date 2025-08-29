import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchCryptos } from "./coinsSlice";

function CoinsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptos, status, error } = useSelector(
    (state: RootState) => state.coins
  );

  // Memoize fetchCryptos to satisfy eslint rules
  const loadCryptos = useCallback(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  useEffect(() => {
    loadCryptos();
  }, [loadCryptos]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {cryptos.map((coin) => (
        <div
          key={coin.id}
          className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center"
        >
          <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-2" />
          <h2 className="text-lg font-bold">{coin.name}</h2>
          <p className="text-gray-600">${coin.current_price}</p>
        </div>
      ))}
    </div>
  );
}

export default CoinsList;
