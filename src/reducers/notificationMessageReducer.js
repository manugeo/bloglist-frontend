const notificationMessageReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION_MESSAGE':
      return action.message;
    default:
      return state;
  }
};

export const showNotification = (message) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION_MESSAGE', message });
    await sleep(3000);
    dispatch({ type: 'SET_NOTIFICATION_MESSAGE', message: null });
  };
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default notificationMessageReducer;