export const CREATE_LISTING = "CREATE_LISTING";
export const CREATE_LISTING_SUCCESS = "CREATE_LISTING_SUCCESS";
export const CREATE_LISTING_FAILURE = "CREATE_LISTING_FAILURE";

export const createListing = (companyName, url, positionName, boardId) => ({
  type: CREATE_LISTING,
  companyName,
  url,
  positionName,
  boardId
});
