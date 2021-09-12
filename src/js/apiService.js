const BASE_URL = 'https://pixabay.com/api/'
const KEY = '23343494-643d22eb41994b430f7c237c0'
let pageNumber = 1;
export default function fetchPicture(searchQuery) {
  return  fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${KEY}`)
    .then(res=>res.json())
};
 