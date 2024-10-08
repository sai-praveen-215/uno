function SingleCountry(props: any) {
  const { data, setSingleDataView, setSingleData } = props;

  return (
    <div
      onClick={() => {
        setSingleDataView(true);
        setSingleData(data);
      }}
      style={{
        height: "450px",
        width: "250px",
        borderBottom: "1px solid #ccc",
        borderRight: "1px solid #ccc",
        borderLeft: "1px solid #ccc",
        borderRadius: "25px",
      }}
    >
      <div
        style={{
          borderRadius: "15px",
          backgroundImage: `url(${data.flags.svg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "50%",
          width: "100%",
        }}
      ></div>

      <div
        style={{
          height: "50%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2>{data?.name?.common}</h2>
        <p>Capital: {data?.capital}</p>
        <p>Region: {data?.region}</p>
        <p>Population: {data?.population}</p>
      </div>
    </div>
  );
}

export default SingleCountry;
