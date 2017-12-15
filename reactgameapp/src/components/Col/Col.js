import React from "react";

const Col = props => {
  const size = props.size.split(" ").map(size => "col-" + size).join(" ") +
                " d-flex flex-wrap";
  return <div className={size} {...props} />;
};

export default Col;