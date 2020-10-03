import { init } from "@rematch/core"
import * as models from "models"
import api from "utils/api"
import persistPlugin from "@rematch/persist"
import storage from "redux-persist/lib/storage"


const persistConfig = {
    key: "root",
    storage,
    callback: () => {
        // TODO: verify auth tokens on rehydrate
    }
}

const store = init({
    models,
    redux: {
        // TODO: make work
        rootReducers: { reset: () => undefined },
    },
    plugins: [persistPlugin(persistConfig)],
})

export default store
