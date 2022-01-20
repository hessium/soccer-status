import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Error403 from "../Error403/Error403";
import api from "../../lib/api";
import sources from "../../sources/sources";
import Spinner from "../../Spinner/Spinner";

const CompetitionPage = (props) => {
  const { match } = props;
  console.log(match);
  const [state, setState] = useState({ isFail: false });

  useEffect(() => {
    if (!state.isFail) {
      const requestData = () => {
        api
          .get(sources.competition(match.params.id))
          .then((response) => console.log(response))
          .catch((e) => {
            if (e.message === "Request failed with status code 403") {
              setState({ isFail: 403 });
            }
          });
      };
      requestData();
    }
  });

  if (state.isFail === 403) {
    return <Error403 />;
  }

  return (
    <>
      <Header />
      <div>
        <Spinner size={5} center />
      </div>
    </>
  );
};

export default CompetitionPage;
