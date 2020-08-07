export default (pictures , category) => {
    const picturesByCategory = pictures.filter((picture) => {
        return picture.category === category
    })

    return picturesByCategory
};
  
