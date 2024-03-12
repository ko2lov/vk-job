import React, { useState, useEffect } from "react";
import { AppRoot } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import ListCoop from "./components/ListCoop";
import groupsData from "./groups.json";
import { ERROR_MESSAGES } from "./constants";

// Имитация задержки в 1 секунду
const fetchGroups = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ result: 1, data: groupsData }), 1000)
  );

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchGroups();
      if (response.result === 0 || !response.data) {
        throw new Error(ERROR_MESSAGES.FETCH_DATA);
      }
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  return (
    <AppRoot>
      <ListCoop data={data} />
    </AppRoot>
  );
};

export default App;
