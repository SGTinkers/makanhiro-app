const PostHelpers = {
  getJustImgName: (img) => {
    const fullUri = img.split('/');
    const justUri = fullUri[fullUri.length - 1];

    return justUri;
  },
};

export { PostHelpers };
