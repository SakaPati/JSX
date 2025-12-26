import "./Components/styles.css";
import { Component } from "react";
import env from "./env";
import axios from "axios";

import { Searchbar } from "./Components/Searchbar/Searchbar";
import { ImageGallery } from "./Components/ImageGallery/ImageGallery";
import { Button } from "./Components/Button/Button";
import { Loader } from "./Components/Loader/Loader";

export class App extends Component {
  state = {
    data: [],
    page: null,
    query: "",
    isLoad: false,
  };

  handleSubmit = async (value) => {
    const res = await axios.get(
      `${env.API_URL}?q=${value}&page=1&key=${env.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    this.setState({
      data: res.data.hits.map((image) => ({
        prevImage: image.webformatURL,
        image: image.largeImageURL,
        tag: image.tags,
      })),
      page: 1,
      query: value,
    });
  };

  loadMore = async () => {
    this.setState({ isLoad: true });
    const nextPage = this.state.page + 1;

    try {
      const res = await axios.get(
        `${env.API_URL}?q=${this.state.query}&page=${nextPage}&key=${env.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState((prevState) => ({
        data: [
          ...prevState.data,
          ...res.data.hits.map((image) => ({
            prevImage: image.webformatURL,
            image: image.largeImageURL,
            tag: image.tags,
          })),
        ],
        page: nextPage,
      }));
    } finally {
      this.setState({
        isLoad: false,
      });
    }
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery onData={this.state.data} />
        {this.state.data.length > 0 && <Button onLoadMore={this.loadMore} />}
        { this.state.isLoad && <Loader />}
      </>
    );
  }
}
