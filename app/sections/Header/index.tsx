import "./style.scss";
import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <ul className="menu">
          <li className="menu__item">
            <Link className="label-1" href={"/"}>
              Home
            </Link>
          </li>
          <li className="menu__item">
            <Link className="label-1" href={"/about"}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
