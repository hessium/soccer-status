import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import api from "../../lib/api";
import sources from "../../sources/sources";
import Spinner from "../../Spinner/Spinner";
import Error403 from "../Error403/Error403";

const TeamsPage = ({ match }) => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    isFail: false,
  });
  console.log(match);
  useEffect(() => {
    if (state.isLoading) {
      const requestTeams = () => {
        api
          .get(sources.teams(match.params.id))
          .then((response) => {
            setState({
              data: response.data,
              isLoading: false,
            });
          })
          .catch((e) => {
            if (e.message === "Request failed with status code 403") {
              setState({ isFail: 403 });
            }
          });
      };

      requestTeams();
    }
  });

  if (state.isFail === 403) {
    return (
      <div>
        <Error403 />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div>
        <Spinner size={5} center />
      </div>
    </div>
  );
};

export default TeamsPage;
