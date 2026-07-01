import React from "react";
import { AvatarCont } from "./Avatar.styles";
import { connect } from "react-redux";

function Avatar({ userDetails }) {
  const displayInitials = () => {
    let initials;
    if (userDetails && userDetails.name) {
      const name = userDetails.name;
      const nameArray = name.split(" ");
      initials = nameArray[0][0] + nameArray[1][0];
    } else {
      initials = "H";
    }

    return initials;
  };

  return <AvatarCont>{displayInitials()}</AvatarCont>;
}

const mapStateToProps = (state) => ({
  userDetails: state.user.userDetails,
});

export default connect(mapStateToProps)(Avatar);
