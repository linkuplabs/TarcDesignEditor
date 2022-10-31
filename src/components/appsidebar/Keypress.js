

export function getKeyboardCommand(e){

  console.log("leooooooooo")
  console.log("hello", e);
  console.log("key", e.key);
  console.log("keyCode", e.keyCode);
  var command =  {command:"unused", params:{}}
  switch(e.key){
    case 'Backspace':
      console.log("backspace")
      // command = {command:"deleteSelected", params:{}}
      break;
      case 'Meta':


        break;
    default:
      break;
  }

  return command;
}