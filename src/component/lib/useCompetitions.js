import { useEffect, useState } from "react";
import { COUNTRIES } from "../constants/constants";
import sources from "../sources/sources";
import api from "./api";
import { formatData } from "../../helpers/helpers";

export function useCompetitions() {
  const [state, setState] = useState({
    data: { national: [], international: [] },
    isloading: true,
    search: null,
  });

  let arr = [];

  useEffect(() => {
    if (state.isloading) {
      const getCompetitons = () => {
        api
          .get(sources.competitions)
          .then((response) => {
            let sortedArr = {
              national: [],
              international: [],
            };

            response.data.competitions
              .filter((item) => COUNTRIES.find((i) => i === item.area.name))
              .forEach((element) => {
                element.area.name === "Europe"
                  ? sortedArr.international.push(element)
                  : arr.push(element);
              });

            setState((prevState) => ({
              data: {
                national: prevState.data.national,
                international: sortedArr.international,
              },
              isloading: false,
            }));
          })
          .then(() => {
            const sortedArea = formatData(arr, COUNTRIES);
            setState((prevState) => ({
              ...prevState,
              data: {
                national: sortedArea,
                international: prevState.data.international,
              },
            }));
          })
          .catch(() => {
            console.log("error");
          });
      };

      getCompetitons();
    }
  });

  const search = (value) => {
    const elem = state.data.national.find((el) => {
      return Object.keys(el).find((i) => i === value);
    });

    if (elem) {
      return setState((prevState) => ({
        ...prevState,
        search: elem[value],
      }));
    } else {
      return setState((prevState) => ({
        ...prevState,
        search: null,
      }));
    }
  };

  return { state, search };
}
