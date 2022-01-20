import React, { useState } from "react";
import cn from "classnames";
import Button from "../Button/Button";
import { useCompetitions } from "../lib/useCompetitions.js";
import styles from "./Header.module.scss";
import Spinner from "../Spinner/Spinner";
import popup from "../../icons/menu.svg"
import cancel from "../../icons/cancel.svg";
const Header = () => {
  const { state } = useCompetitions();
  const [menu, setMenu] = useState("isClose");

  const openMenu = () => {
    setMenu("isOpen");
  };
  const closeMenu = () => {
    setMenu("isClose");
  };
  const openSubMenu = () => {
    setMenu("subMenu");
  };

  const menuClassName = cn(styles.navMenu, {
    [styles.active]: menu === "isOpen" || menu === "subMenu",
  });

  const subMenuClassName = cn(styles.dropDownList, {
    [styles.subMenuActive]: menu === "subMenu",
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Button
          className={cn(styles.mobileNavBtn, styles.mobile)}
          onClick={openMenu}
          variant="square"
        >
          <img src={popup} alt="menu" />
        </Button>
        <a className={styles.logo} href="/">
          EuroMATCH
        </a>
      </div>
      <div className={cn(styles.wrap)}>
        <nav>
          <div className={menuClassName}>
            <Button
              className={cn(
                styles.mobileNavBtn,
                styles.mobile,
                styles.closeBtn
              )}
              onClick={closeMenu}
              variant="square"
            >
             <img src={cancel} alt="cancel" />
            </Button>

            <ul className={styles.navList}>
              <li className={styles.navListItem}>
                <Button className={styles.listItemLink} onClick={openSubMenu}>
                  Competitions
                </Button>

                <ul className={subMenuClassName}>
                  <li className={styles.dropDownSection}>
                    <Button
                      className={cn(styles.closeSubMenu, styles.mobile)}
                      variant="transparent"
                      onClick={openMenu}
                    >
                      
                      Competitions
                    </Button>
                    <div className={styles.inner}></div>

                    <ul className={styles.sublist}>
                      <li className={cn(styles.sublistItem, styles.mobile)}>
                        <a className={styles.sublistItemLink} href="/">
                          All competitions
                        </a>
                      </li>
                      {state.isloading ? (
                        <Spinner size={3} center />
                      ) : (
                        state.data.international.map((i) => (
                          <li key={i.id} className={cn(styles.sublistItem)}>
                            <a
                              href={`/competitions/${i.id}`}
                              className={styles.sublistItemLink}
                            >
                              {i.name}
                            </a>
                          </li>
                        ))
                      )}
                    </ul>

                    <a
                      href="/"
                      className={cn(styles.seeAllLink, styles.desktop)}
                    >
                      <div className={styles.allProductSection}>
                        <span className={styles.allProductText}>
                          All competitions
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>

              <li className={styles.navListItem}>
                <a href="/matches" className={styles.listItemLink}>
                  Matches
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
