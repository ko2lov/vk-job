import React, { useState, useEffect } from "react";
import { AppRoot } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import ListCoop from "./components/ListCoop";
import groupsData from "./groups.json";

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
    const fetchData = async () => {
      try {
        const response = await fetchGroups();
        if (response.result === 0 || !response.data) {
          throw new Error("Ошибка получения данных");
        }
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

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
