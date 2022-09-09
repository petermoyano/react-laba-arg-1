import loadingCircle from "../assets/loading_circle.svg";
import plusIcon from "../assets/plus_icon.svg";
import React from "react";

class GetButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pushPhoto: props.pushPhoto,
    };
  }

  triggerPushPhoto = async () => {
    this.setLoading(true);
    this.state.pushPhoto();
  };

  setLoading = (value) => this.setState(() => ({ loading: value }));

  render() {
    return (
      <button className="square_button" onClick={this.triggerPushPhoto}>
        {this.state.loading ? (
          <img
            className="square_button__loading"
            src={loadingCircle}
            alt="loading Circle"
          />
        ) : (
          <img className="square_button__icon" src={plusIcon} alt="plus_icon" />
        )}
      </button>
    );
  }
}

export default GetButton;
