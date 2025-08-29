import React, { useEffect, useState } from "react";
import { CoinType } from "../../common/types";
import Items from "../../components/Items";
import {
  useGetAllCryptosQuery,
  useGetCryptosMutation,
} from "../../services/cryptoApi";
import { Link } from "react-router-dom";

const Coins = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [perPage, setPerpage] = useState<string>("10");
  const [getCryptos, { data: coins }] = useGetCryptosMutation();
  const { data } = useGetAllCryptosQuery();
  const pages = ["5", "10", "15", "20", "25", "30"];

  useEffect(() => {
    fetchCryptos();
  }, [page, perPage]);

  const fetchCryptos = async () => {
    await getCryptos({ page, perPage });
  };

  const handlePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerpage(e.target.value);
  };

  const filteredCoins = data?.filter((coin) =>
    coin.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <div className="max-w-screen-lg m-auto">
      <div>
        <div className="grid gap-4 ml-4 mb-6 md:grid-cols-3 mt-4 items-center justify-center">
          <input
            type="text"
            id="first_name"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            placeholder="Search your favourite crypto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-row justify-between items-center bg-gray-900 rounded-lg font-bold mx-4 my-8 py-3 px-4 shadow-sm">
          <p>#</p>
          <p className="">Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className="hide-mobile">Volume</p>
          <p className="hide-mobile">Market Cap</p>
        </div>
        {!name
          ? coins?.map((coin: CoinType) => (
              <Link to={`/coin/${coin.id}`} key={coin.id}>
                <Items coin={coin} />
              </Link>
            ))
          : filteredCoins?.map((coin: CoinType) => (
              <Link to={`/coin/${coin.id}`} key={coin.id}>
                <Items key={coin.id} coin={coin} />
              </Link>
            ))}

        <div
          className="flex items-center justify-center"
          style={{ opacity: `${name ? 0 : 1}` }}
        >
          <button
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 1 ? true : false}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          >
            Prev
          </button>
          <p className="text-lg font-bold ">{page}</p>
          <button
            onClick={() => setPage((page) => page + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          >
            Next
          </button>
          <div className="dropdown inline-block relative ml-8">
            <span>Per Page: </span>
            <select value={perPage} onChange={handlePage}>
              {pages.map((page, index) => (
                <option key={index}>{page}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coins;
