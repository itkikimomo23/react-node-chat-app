import axios from "axios";
import * as types from "./actionType";

const END_POINT = "http://localhost:8080/api"

const jwtToken = () => {
  const userData = JSON.parse(localStorage.getItem("chat-app-login-user-data"));
  return "Bearer " + String(userData.token);
};

// search users
const searchUsers = (query) => async (dispatch) => {

  if (query.length == 0) {
    return false
  }

  dispatch({ type: types.SEARCH_USER_PROCESSING });
  try {
    const result = await axios.get(`${END_POINT}/user?search=${query}`, {
      headers: {
        Authorization: jwtToken()
      }
    });
    dispatch({ type: types.SEARCH_USER_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: types.SEARCH_USER_FAIL });
  }
};

// creating one to one chat
const createSingleUserChat = (userId) => async (dispatch) => {
  dispatch({ type: types.SINGLE_CHAT_CREATE_PROCESSING });
  try {
    const result = await axios.post(`${END_POINT}/chat`, { userId: userId }, {
      headers: {
        Authorization: jwtToken()
      }
    });

    localStorage.setItem("chat-app-single-user-chat", JSON.stringify(result.data));
    dispatch({ type: types.SINGLE_CHAT_CREATE_SUCCESS, payload: result.data });

  } catch (error) {
    dispatch({ type: types.SINGLE_CHAT_CREATE_FAIL });
  }
}


//  get all chat 
const getChats = () => async (dispatch) => {
  dispatch({ type: types.ALL_CHATS_REQUEST_PROCESSING });
  try {
    const result = await axios.get(`${END_POINT}/chat`, {
      headers: {
        Authorization: jwtToken()
      }
    })
    dispatch({ type: types.ALL_CHATS_REQUEST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: types.ALL_CHATS_REQUEST_FAIL, payload: error.response.data.error });
  }
}


// creating group
const createGroup = (obj) => async (dispatch) => {
  console.log("post ",JSON.stringify(obj))
  dispatch({ type: types.CREATE_GROUP_REQUEST_PROCESSING });
  try {
    const result = await axios.post(`${END_POINT}/chat/group`, obj, {
      headers: {
        Authorization: jwtToken()
      }
    });

    console.log(result)

    dispatch({ type: types.CREATE_GROUP_REQUEST_SUCCESS, payload: result.data });

  } catch (error) {
    console.log(error)

    dispatch({ type: types.CREATE_GROUP_REQUEST_FAIL });
  }
}

export { searchUsers, createSingleUserChat, getChats, createGroup };
