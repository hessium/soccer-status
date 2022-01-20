import React, { useState } from "react";
import Header from "../../Header/Header";
import cn from "classnames";
import { Row, RowContain, Cell } from "../../Table/Table";
import Calendar from "react-calendar";
import { getDate, getQuery } from "../../../helpers/helpers";
import Radio from "../../RadioButton/RadioButton";
import AutoSave from "../../../helpers/autoSave";
import "react-calendar/dist/Calendar.css";
import { Field, Form } from "react-final-form";
import { MATCH_STATUS } from "../../constants/constants";
import Button from "../../Button/Button";
import Spinner from "../../Spinner/Spinner";
import CrashPage from "../CrashPage/CrashPage";

import { useFilter } from "../../lib/useFilter";
import styles from "./MatchesPage.module.scss";
import sources from "../../sources/sources";

const MatchesPage = ({ history }) => {
  let query = getQuery(history.location.search);
  const source = sources.matches;
  const { state, filter, resetFilters } = useFilter(query, history, source);

  const [filtersIsOpen, toggleFilter] = useState(false);

  const [date, setDate] = useState(
    query.dateFrom && query.dateTo
      ? [new Date(query.dateFrom), new Date(query.dateTo)]
      : new Date()
  );

  const setValues = async (form, data) => {
    form.change("dateFrom", getDate(data[0]));
    form.change("dateTo", getDate(data[1]));
    setDate(data);
  };

  const setFilters = () => {
    toggleFilter(!filtersIsOpen);
  };
  const filterCN = cn(styles.filters, {
    [styles.filtersActive]: filtersIsOpen === true,
  });
  const formCN = cn(styles.form, {
    [styles.formActive]: filtersIsOpen === true,
  });

  if (state.isFail) {
    return <CrashPage />;
  }

  return (
    <div className={styles.page}>
      <Header />
      {state.isLoading ? (
        <div>
          <Spinner size={5} center />
        </div>
      ) : (
        <div className={styles.wrap}>
          <div className={filterCN}>
            <Button
              className={cn(styles.filterBtn, styles.mobile)}
              onClick={setFilters}
            >
               <div className={styles.btnInner}>
                {filtersIsOpen /* ? <CancelIcon/>  : <FilterIcon /> */}
                Filter
              </div>  
            </Button>
            <Form
              onSubmit={filter}
              initialValues={getQuery(history.location.search)}
              render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit} className={formCN}>
                  <div className={styles.filtersInner}>
                    <div className={styles.filtersTitle}>
                      <span>Match status:</span>
                      <AutoSave debounce={500} save={filter} />
                    </div>

                    {MATCH_STATUS.map((i) => (
                      <Field
                        name="status"
                        type="radio"
                        value={i.name}
                        key={i.id}
                        render={({ input }) => (
                          <Radio {...input}>{i.name}</Radio>
                        )}
                      />
                    ))}
                    <div className={styles.calendar}>
                      <Field name="calendar">
                        {() => (
                          <Calendar
                            selectRange={true}
                            returnValue="range"
                            onChange={(data) => setValues(form, data)}
                            value={date}
                          />
                        )}
                      </Field>
                    </div>
                    <Button
                      variant="rounded"
                      onClick={() => resetFilters(form)}
                    >
                      Clear filters
                    </Button>
                  </div>
                </form>
              )}
            />
          </div>
          <div className={styles.contain}>
            {state.data.matches && state.data.matches.length > 0 ? (
              state.data.matches.map((item) => (
                <RowContain key={item.id}>
                  <a
                    href={`/matches/${item.id}`}
                    className={styles.containLink}
                  >
                    <Row>
                      <Cell className={styles.competition}>
                        <img src={item.competition.area.ensignUrl} alt="flag" />
                        <span>{item.competition.name}</span>
                      </Cell>
                      <Cell className={styles.homeTeam}>
                        {item.homeTeam.name}
                      </Cell>
                      <Cell className={styles.score}>
                        {item.score.fullTime.homeTeam}
                      </Cell>
                      <Cell className={styles.status}>{item.status}</Cell>
                      <Cell className={styles.score}>
                        {item.score.fullTime.awayTeam}
                      </Cell>
                      <Cell className={styles.awayTeam}>
                        {item.awayTeam.name}
                      </Cell>
                    </Row>
                  </a>
                </RowContain>
              ))
            ) : (
              <div>No results were found for your search.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesPage;
