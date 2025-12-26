import { ImageGalleryItem } from "./ImageGalleryItem";
import { Modal } from "../Modal/Modal";
import { Component } from "react";

export class ImageGallery extends Component {
  state = {
    image: "",
  };

  handleClick = (e) => {
    if (e.target.nodeName !== "IMG")
      return this.setState({
        image: "",
      });
    const findElem = this.props.onData.find(
      (elem) => elem.prevImage == e.target.src
    ).image;
    this.setState({
      image: findElem,
    });
  };

  render() {
    return (
      <ul className="ImageGallery" onClick={this.handleClick}>
        <ImageGalleryItem onImage={this.props.onData} />
        {this.state.image && <Modal onImage={this.state.image} />}
      </ul>
    );
  }
}
