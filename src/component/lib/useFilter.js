import { useEffect, useState } from "react";
import api from "../lib/api";
import { getQuery } from "../../helpers/helpers";
import qs from "query-string";

export function useFilter(query, history, source) {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    isFail: false,
  });

  console.log(source);

  useEffect(() => {
    if (state.isLoading) {
      const getMatches = () => {
        api
          .get(source, {
            params: { ...query },
          })
          .then((response) => {
            setState({
              data: response.data,
              isLoading: false,
              isFail: false,
            });
          })
          .catch((e) => {
            if (e) {
              setState((prevState) => ({
                ...prevState,
                isFail: true,
              }));
            }
          });
      };
      getMatches();
    }
  });

  const updateMatches = () => {
    let queryParams = getQuery(history.location.search);
    api
      .get(source, {
        params: {
          ...queryParams,
        },
      })
      .then((response) => {
        setState({
          data: response.data,
          isLoading: false,
          isFail: false,
        });
      });
  };

  const filter = (val) => {
    history.push({
      pathname: history.location.pathname,
      search: qs.stringify(val),
    });
    updateMatches();
  };

  const resetFilters = (form) => {
    form.reset();
    history.push({
      pathname: history.location.pathname,
    });
  };

  return { state, filter, resetFilters };
}
