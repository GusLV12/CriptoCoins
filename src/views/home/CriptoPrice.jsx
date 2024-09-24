import { useEffect, useState } from "react";
import axios from "axios";
import { coins, headersTable } from "../../utils/const";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./cripto.css";

// Mover fetchCryptoData fuera del componente
export const fetchCryptoData = async (coins, currency) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      {
        params: {
          vs_currency: currency,
          ids: coins.join(","),
        },
      }
    );

    // Validar que la estructura sea correcta
    if (response && response.data) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: "Invalid data structure",
      };
    }
  } catch (error) {
    console.error("Error fetching data from CoinGecko API:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const CryptoPrices = () => {
  const [dataCriptos, setDataCriptos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const divisa = "usd";

  const apiCripto = async () => {
    try {
      const response = await fetchCryptoData(coins, divisa);

      if (response.success) {
        setDataCriptos(response.data);
      } else {
        setError("Error fetching data");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCripto();
  }, []);

  useEffect(() => {
    console.log("dataCriptos: ", dataCriptos);
  }, [dataCriptos]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Table className="w-3/4 mx-auto">
          <TableCaption className="custom-heading text-black text-center">
            CriptoCoins
          </TableCaption>
          <TableHeader>
            <TableRow>
              {headersTable.map((header, index) => (
                <TableHead
                  key={index}
                  className="custom-heading text-center text-white"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataCriptos &&
              dataCriptos.map((coin, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{coin.name}</TableCell>
                  <TableCell className="text-center">
                    ${coin.current_price?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell
                    className={`text-center ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h !== undefined
                      ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    ${coin.market_cap?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    ${coin.total_volume?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    #{coin.market_cap_rank || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    ${coin.high_24h?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell className="flex text-center items-center justify-center">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width={20}
                      height={20}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
