import AppDispatcher from "AppDispatcher"
import {ActionTypes} from "Constants"

let ServerActions = {
  recieveLinks(links) {
    console.log("2. In ServerActions")
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECIEVE_LINKS,
      links
    })
  }
}

export default ServerActions
