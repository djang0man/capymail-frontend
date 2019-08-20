export default (state=[], { type, payload }) => {
  switch(type){
    case 'CONVERSATIONS_SET': 
      return payload;
    case 'CONVERSATION_CREATE':
      return [...state, payload];
    case 'TOKEN_REMOVE':
      return [];
    default: 
      return state;
  }
};

