import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {

  //對接收的props進行類型和必要性的限制
  static propTypes = {
    tables:PropTypes.array.isRequired
  }

  render() {
    const {tables, count} = this.props
    return (
        <div className="tables-div">
          {
            tables.map((table, index)=>{
                return <Item key={table.id} table={table} index={index} count={count}/>
            })
          }
          <div className="clear-float"></div>
        </div>
    )
  }
}