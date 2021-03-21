import {applyMiddleware} from 'redux'
//import appThunk from './thunk'
import thunk from 'redux-thunk'
import logger from './logger'

export default applyMiddleware(
    thunk,
    logger,
//    appThunk
)

