import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineMoon } from "react-icons/hi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import SingleCountry from "./Components/SingleCountry";
import { getApi } from "./Slice";

function App() {
  const dispatch = useDispatch<any>();
  const [theme, setTheme] = useState(false);
  const [isSingleDataView, setSingleDataView] = useState<any>(false);
  const [singleData, setSingleData] = useState<any>({});
  const [allData, setAllData] = useState<any>([]);
  const [searchByCountry, setSearchByCountry] = useState("");

  // Selector to get only the necessary part of the state
  const countriesData = useSelector(
    (store: any) => store?.api?.contries?.state
  );

  const handleTheme = () => {
    setTheme(!theme);
  };

  const handleChange = (value: any) => {
    const filteredData = countriesData?.filter(
      (item: any) => item.region === value
    );
    setAllData(filteredData);
  };

  useEffect(() => {
    dispatch(getApi());
  }, [dispatch]);

  const handleSearchByCountry = () => {
    const searchValue = searchByCountry.trim().toLowerCase();
    const filteredData = countriesData?.filter((item: any) => {
      return item?.name?.common?.toLowerCase().includes(searchValue);
    });
    setAllData(filteredData);
  };

  const Header = () => (
    <div
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: theme ? "black" : "rgb(219 219 219)",
        color: theme ? "white" : "black",
      }}
    >
      <div
        style={{
          padding: "2px",
          marginLeft: "60px",
          marginRight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Where In the World?</h3>
        <h3
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleTheme}
        >
          <HiOutlineMoon /> {theme ? "Light Mode" : "Dark Mode"}
        </h3>
      </div>
    </div>
  );

  return (
    <>
      {isSingleDataView ? (
        <div
          style={{
            paddingBottom: "140px",
            backgroundColor: theme ? "#444444" : "whitesmoke",
            color: theme ? "white" : "black",
            margin: "0px",
          }}
        >
          <Header />
          <div style={{ marginTop: "50px", marginLeft: "150px" }}>
            <button
              onClick={() => setSingleDataView(false)}
              style={{
                height: "30px",
                width: "85px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                backgroundColor: theme ? "#444444" : "whitesmoke",
                color: theme ? "white" : "black",
                fontSize: "15px",
                cursor: "pointer",
                marginBottom: "50px",
              }}
            >
              <MdOutlineKeyboardBackspace />
              Back
            </button>
          </div>
          <div
            style={{
              height: "400px",
              marginTop: "25px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "50%",
                backgroundImage: `url(${singleData?.flags?.svg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div style={{ height: "100%", width: "50%", marginLeft: "25px" }}>
              <h2>{singleData?.name?.common}</h2>
              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <h3>Native Name: {singleData?.nativeName}</h3>
                  <h3>Population: {singleData?.population}</h3>
                  <h3>Region: {singleData?.region}</h3>
                  <h3>Sub Region: {singleData?.subregion}</h3>
                  <h3>Capital: {singleData?.capital}</h3>
                </div>
                <div>
                  <h3>
                    Currencies:
                    {Object.keys(singleData?.currencies || {}).map(
                      (key) => `${singleData?.currencies[key].name}, `
                    )}
                  </h3>
                  <h3>
                    Languages:
                    {Object.keys(singleData?.languages || {}).map(
                      (key) => `${singleData?.languages[key]}, `
                    )}
                  </h3>
                </div>
              </div>
              <div>
                <h2 style={{ display: "flex", gap: "10px" }}>
                  Border Countries:
                  {singleData?.borders?.map((item: any) => (
                    <div
                      key={item}
                      style={{
                        width: "55px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: theme ? "#444444" : "whitesmoke",
            color: theme ? "white" : "black",
            margin: "0px",
          }}
        >
          <div style={{ marginBottom: "50px" }}>
            <Header />
          </div>
          <div
            style={{
              padding: "2px",
              marginLeft: "60px",
              marginBottom: "40px",
              marginRight: "40px",
              display: "flex",
              width: "85%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              onChange={(e) => {
                setSearchByCountry(e.target.value);
                handleSearchByCountry();
              }}
              style={{
                height: "25px",
                width: "250px",
                backgroundColor: theme ? "#444444" : "whitesmoke",
                color: theme ? "white" : "black",
              }}
              placeholder={` Search For Country.....`}
            />
            <select
              onChange={(e) => handleChange(e.target.value)}
              style={{
                backgroundColor: theme ? "#444444" : "whitesmoke",
                color: theme ? "white" : "black",
                width: "150px",
                height: "25px",
                fontSize: "15px",
              }}
            >
              <option value="">Filter By Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          <div>
            {allData.length === 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "16px",
                  marginLeft: "55px",
                }}
              >
                {countriesData?.map((item: any) => (
                  <SingleCountry
                    key={item.name.common}
                    data={item}
                    setSingleData={setSingleData}
                    setSingleDataView={setSingleDataView}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "16px",
                  marginLeft: "55px",
                }}
              >
                {allData?.map((item: any) => (
                  <SingleCountry
                    key={item.name.common}
                    data={item}
                    setSingleData={setSingleData}
                    setSingleDataView={setSingleDataView}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
