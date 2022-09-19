import usersService from '../services/users';

const { getAll } = usersService;

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return [...action.users];

    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await getAll();
    dispatch({ type: 'SET_USERS', users });
  };
};

export default usersReducer;