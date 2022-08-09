const isCreateVisibleReducer = (state = false, action) => {
  switch (action.type) {
  case 'SET_IS_CREATE_VISIBLE':
    return action.isCreateVisible;
  default:
    return state;
  }
};

export const isCreateVisibleChange = (isCreateVisible) => {
  return {
    type: 'SET_IS_CREATE_VISIBLE',
    isCreateVisible
  };
};

export default isCreateVisibleReducer;