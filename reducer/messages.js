export default (state=[], { type, payload }) => {
  switch(type){
    case 'MESSAGES_SET': 
      return payload;
    case 'MESSAGES_UNSET':
      return [];
    case 'MESSAGE_CREATE':
      return [...state, payload];
    case 'TOKEN_REMOVE':
      return [];
    default: 
      return state;
  }
};

