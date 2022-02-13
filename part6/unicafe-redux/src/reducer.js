const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':{
      const goodPlusOne = {
        ...state,
        good: state.good + 1
      }
      return goodPlusOne
    }
    case 'OK': {
      const okPlusOne = {
        ...state,
        ok: state.ok + 1
      }
      return okPlusOne
    }
    case 'BAD': {
      const badPlusOne = {
        ...state,
        bad: state.bad + 1
      }
      return badPlusOne
    }
    case 'ZERO': {
      const zero = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return zero
    }
    default: return state
  }
  
}

export default counterReducer