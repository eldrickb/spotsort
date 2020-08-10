import createStore from 'react-waterfall'

import api from "utils/api"

const config = {
  initialState: {
      loggedIn: false,
      userDetails: {}
  },
  actionsCreators: {
      getUserDetails: async () => {
          let profile = await api.get("/user/profile")
          return {
              loggedIn: true,
              userDetails: profile.data
          }
      },
      setUserManually: ({ user }) => ({
          loggedIn: true,
          userDetails: user
      })
  },
}

export const { Provider, connect, actions } = createStore(config)
