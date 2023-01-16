import { WohnungCard } from "./Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Sorter } from "./Sorter";
const supabaseUrl = "https://bnwjefziktrpjkkaxeuh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJud2plZnppa3RycGpra2F4ZXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3ODg4NTMsImV4cCI6MTk4OTM2NDg1M30.yAsb7nRdWPS0MQQV4y4QTFysLLVVbH7XR1AVXkW3dDM";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [wohnungList, setWohnungList] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [sortedWohnungList, setSortedWohnungList] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data: wohnungenInfo } = await supabase
        .from("wohnungen")
        .select("*");

      setWohnungList(wohnungenInfo);
    };
    getData();
  }, []);

  //sort
  useEffect(() => {
    const wohnungListCopy = [...wohnungList];
    if (sortBy === "price") {
      const sortedList = wohnungListCopy.sort((a, b) => a.price - b.price);
      setSortedWohnungList(sortedList);
    } else if (sortBy === "sqm") {
      const sortedListSqm = wohnungListCopy.sort((a, b) => b.sqm - a.sqm);
      setSortedWohnungList(sortedListSqm);
    } else {
      setSortedWohnungList(undefined);
    }
  }, [sortBy, wohnungList]);

  const getdurchnittPreis = () => {
    let sum = 0;

    if (wohnungList.length) {
      wohnungList.forEach((wohnung) => (sum += wohnung.price));

      const average = sum / wohnungList.length;
      return average.toFixed(2);
    }
    return Number(0).toFixed(2);
  };

  const average = getdurchnittPreis();

  return (
    <Container className="my-4">
      <h1 className="text-center">
        My Flat Alerts in Barcelona <i>(Eixample Neighborhood)</i>
      </h1>
      <h3 className="text-center">Average Price: {average} €</h3>
      <Sorter setSortBy={setSortBy} />
      <Row xs={1} md={2} lg={4}>
        <WohnungCard wohnungen={sortedWohnungList ?? wohnungList} />
      </Row>
    </Container>
  );
}

export default App;
