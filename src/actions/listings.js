export const CREATE_LISTING = "CREATE_LISTING";
export const CREATE_LISTING_SUCCESS = "CREATE_LISTING_SUCCESS";
export const CREATE_LISTING_FAILURE = "CREATE_LISTING_FAILURE";
export const MARK_LISTING_CLOSED = "MARK_LISTING_CLOSED";
export const MARK_LISTING_CLOSED_SUCCESS = "MARK_LISTING_CLOSED_SUCCESS";
export const MARK_LISTING_CLOSED_FAILURE = "MARK_LISTING_CLOSED_FAILURE";

export const createListing = (companyName, url, positionName, boardId) => ({
  type: CREATE_LISTING,
  companyName,
  url,
  positionName,
  boardId,
});

export const markListingClosed = listingId => ({
  type: MARK_LISTING_CLOSED,
  listingId,
});
