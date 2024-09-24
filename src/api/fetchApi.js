import axios from 'axios';

export const fetchCryptoData = async (coins, divisa) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_URL_CRIPTO}/simple/price`, {
      params: {
        ids: coins, // IDs de las criptomonedas que deseas consultar
        vs_currencies: divisa // Moneda en la que quieres los precios
      }
    });

    const data = response.data;

    return {
      success: true, // Indicador de éxito
      data: data // Datos obtenidos de la API
    };
  } catch (error) {
    console.error('Error fetching data from CoinGecko API:', error);
    return {
      success: false, // Indicador de fallo
      error: error.message // Detalle del error
    };
  }
};

/*
import axios from 'axios';

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_URL_CRIPTO}/simple/price`, {
      params: {
        ids: 'bitcoin,ethereum', // IDs de las criptomonedas que deseas consultar
        vs_currencies: 'usd' // Moneda en la que quieres los precios
      }
    });

    const data = response.data;

    return {
      success: true, // Indicador de éxito
      data: data // Datos obtenidos de la API
    };
  } catch (error) {
    console.error('Error fetching data from CoinGecko API:', error);
    return {
      success: false, // Indicador de fallo
      error: error.message // Detalle del error
    };
  }
};

*/