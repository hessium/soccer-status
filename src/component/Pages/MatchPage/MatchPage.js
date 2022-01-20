import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import api from "../../lib/api";
import sources from "../../sources/sources";
import Spinner from "../../Spinner/Spinner";
import { Row, RowContain, Cell } from "../../Table/Table";
import CrashPage from "../CrashPage/CrashPage";
import styles from "./MatchPage.module.scss";

const MatchPage = ({ match }) => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    isFail: false,
  });

  useEffect(() => {
    if (state.isLoading) {
      const getMatch = () => {
        api
          .get(sources.match(match.params.id))
          .then((response) => {
            setState({
              data: response.data.match,
              isLoading: false,
            });
          })
          .catch((error) => {
            if (error.message) {
              setState({ isFail: true });
            }
          });
      };

      getMatch();
    }
  });

  console.log(state);

  if (state.isFail) {
    return <CrashPage />;
  }

  return (
    <div className={styles.page}>
      <Header />
      <div>
        {state.isLoading ? (
          <div>
            <Spinner size={5} center />
          </div>
        ) : (
          <div className={styles.wrap}>
            <div className={styles.inner}>
              <div className={styles.area}>
                <span>Country:</span> {state.data.competition.area.name}
              </div>
              <div className={styles.competition}>
                <span>Competition:</span>
                <a href={`/competitions/${state.data.competition.id}`}>
                  {state.data.competition.name}
                </a>
              </div>
            </div>
            <div className={styles.contain}>
              <RowContain className={styles.rowContainer}>
                <Row className={styles.containRow}>
                  <Cell className={styles.linkCell}>
                    <a
                      href={`/teams/${state.data.homeTeam.id}/matches`}
                      className
                    >
                      {state.data.homeTeam.name}
                    </a>
                  </Cell>
                  <Cell className={styles.statusCell}>{state.data.status}</Cell>
                  <Cell className={styles.linkCell}>
                    <a href={`/teams/${state.data.awayTeam.id}/matches`}>
                      {state.data.awayTeam.name}
                    </a>
                  </Cell>
                </Row>
                <Row>
                  <Cell className={styles.nameCell}>Full time:</Cell>
                  <Cell className={styles.scoreCell}>
                    <span>{state.data.score.fullTime.homeTeam}</span>-
                    <span>{state.data.score.fullTime.awayTeam}</span>
                  </Cell>
                </Row>
                <Row>
                  <Cell className={styles.nameCell}>Half time:</Cell>
                  <Cell className={styles.scoreCell}>
                    <span>{state.data.score.halfTime.homeTeam}</span>-
                    <span>{state.data.score.halfTime.awayTeam}</span>
                  </Cell>
                </Row>
              </RowContain>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPage;
