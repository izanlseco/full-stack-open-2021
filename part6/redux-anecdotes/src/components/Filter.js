import React from 'react'
import { connect } from 'react-redux';

import { applyFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = ({ target }) => {
    props.applyFilter(target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input
                name="filter"
                onChange={handleChange}
              />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  applyFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)