export default (state=[], {type, payload}) => {
  switch(type){
    case 'CONVERSATION_SET': 
      return payload;
    case 'CONVERSATION_UNSET':
      return [];
    case 'TOKEN_REMOVE':
      return [];
    default: 
      return state;
  }
};
