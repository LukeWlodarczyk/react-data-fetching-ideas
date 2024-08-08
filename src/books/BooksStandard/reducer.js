export const REQUEST_STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const ACTIONS = {
  RESET: 'RESET',
  INIT: 'INIT',
  RESOLVE: 'RESOLVE',
  REJECT: 'REJECT',
};

export const initialState = {
  data: null,
  error: null,
  status: REQUEST_STATUS.IDLE,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.RESET:
      return { ...initialState };
    case ACTIONS.INIT:
      return { ...initialState, status: REQUEST_STATUS.LOADING };
    case ACTIONS.RESOLVE:
      return {
        data: action.payload,
        error: null,
        status: REQUEST_STATUS.SUCCESS,
      };
    case ACTIONS.REJECT:
      return {
        data: null,
        error: action.payload,
        status: REQUEST_STATUS.ERROR,
      };
    default:
      state;
  }
};
