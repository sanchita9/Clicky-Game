import React from "react";
import Row from "../Row";
import "./Jumbotron.css";

const Jumbotron = props =>
  <div className="jumbotron text-center text-white">
    <Row className="text-center">
          <h1>{props.title}</h1>
    </Row>
    <Row className="text-center">
          <h4>{props.instructions}</h4>
    </Row>
    <Row className="text-right">
            <h4>score: {props.score} out of {props.friendCount}</h4>
    </Row>
  </div>;

export default Jumbotron;