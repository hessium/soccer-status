import React from "react";
import Header from "../../Header/Header";
import { RowContain, Row, Cell } from "../../Table/Table";
import { useCompetitions } from "../../lib/useCompetitions";
import Input from "../../Input/Input";
import Spinner from "../../Spinner/Spinner";
import styles from "./Competitions.module.scss";

const CompetitionsPage = () => {
  const { state, search } = useCompetitions();
  const handleChange = (e) => {
    search(e.target.value);
  };

  console.log(state);

  return (
    <div className={styles.page}>
      <Header />
      {state.isloading ? (
        <div className={styles.wrapSpinner}>
          <Spinner size={5} center />
        </div>
      ) : (
        <div className={styles.wrap}>
          <div className={styles.international}>
            <div>International:</div>
            {state.data.international.map((i) => (
              <RowContain key={i.id}>
                <Row>
                  <Cell>
                    <a key={i.id} href={`/competitions/${i.id}`}>
                      {i.name}
                    </a>
                  </Cell>
                  <Cell>
                    <a
                      href={`/competitions/${i.id}/teams`}
                      className={styles.teamsLink}
                    >
                      Teams
                    </a>
                  </Cell>
                </Row>
              </RowContain>
            ))}
          </div>

          <div className={styles.topContain}>
            <span>Nationnal:</span>
            <Input onChange={handleChange} placeholder="Enter the country" />
          </div>
          <div className={styles.contain}>
            {!state.search ? (
              state.data.national.map((elem) => {
                const area = Object.keys(elem).find((i) => i);
                return (
                  <div
                    key={elem[area][0].area.countryCode}
                    className={styles.inner}
                  >
                    <div className={styles.card}>
                      <div className={styles.areaName}>{area}:</div>
                      {elem[area].map((item) => (
                        <RowContain key={item.id}>
                          <Row>
                            <Cell>
                              <a
                                key={item.id}
                                href={`/competitions/${item.id}`}
                              >
                                {item.name}
                              </a>
                            </Cell>
                            <Cell>
                              <a
                                className={styles.teamsLink}
                                href={`/competitions/${item.id}/teams`}
                              >
                                Teams
                              </a>
                            </Cell>
                          </Row>
                        </RowContain>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div>{state.search[0].area.name}:</div>
                {state.search.map((item) => (
                  <div className={styles.contain}>
                    <RowContain>
                      <Row>
                        <Cell>{item.name}</Cell>
                        <Cell>
                          <a
                            className={styles.teamsLink}
                            href={`/competitions/${item.id}/teams`}
                          >
                            Teams
                          </a>
                        </Cell>
                      </Row>
                    </RowContain>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionsPage;
