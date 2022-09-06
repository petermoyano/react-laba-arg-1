import React from 'react';
import { getNewImage, updatePhotos } from './services';
import { AddNewPhoto, PictureGrid, RefreshButton } from './components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };

    this.addNewPicture = this.addNewPicture.bind(this);
    this.refreshOne = this.refreshOne.bind(this);
    this.refreshAll = this.refreshAll.bind(this);
  }

  async addNewPicture() {
    const newImageUrl = await getNewImage();

    this.setState({
      images: [...this.state.images, ...newImageUrl],
    });
  }

  async refreshOne(selected) {
    const newImageUrl = await getNewImage();
    const newImages = this.state.images.map((url, i) => (selected === i ? newImageUrl : url));
    this.setState({ images: newImages });
  }

  async refreshAll() {
    const newImages = await updatePhotos(this.state.images.length);
    this.setState({ images: newImages });
  }

  render() {
    return (
      <>
        <PictureGrid data={this.state.images} handleRefresh={this.refreshOne} />
        <AddNewPhoto onClick={this.addNewPicture} />
        <RefreshButton onClick={this.refreshAll} />
      </>
    );
  }
}

export default App;
