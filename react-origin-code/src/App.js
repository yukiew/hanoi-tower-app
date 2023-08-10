import React, { Component } from "react";
import { nanoid } from 'nanoid'
import Header from "./Component/Header";
import List from "./Component/List";
import './App.css'

export default class App extends Component {
  state = {
    tables: [],
    count: 0
  }

  buildTowers(n, sourceTower, tampTower, targetTower) {
    const { tables, count } = this.state;
    let towerObj = JSON.parse(JSON.stringify(tables[tables.length - 1]));
    // eslint-disable-next-line
    if (n == 1) {
      towerObj[targetTower].unshift(towerObj[sourceTower].shift());
      towerObj.id = nanoid();
      tables.push(towerObj);
      // eslint-disable-next-line
      if (count == 1) {
        this.setState({ tables });
      }
      return;
    }
    
    this.buildTowers(n - 1, sourceTower, targetTower, tampTower);
    towerObj = JSON.parse(JSON.stringify(tables[tables.length - 1]));
    towerObj[targetTower].unshift(towerObj[sourceTower].shift());
    towerObj.id = nanoid();
    tables.push(towerObj);
    this.buildTowers(n - 1, tampTower, sourceTower, targetTower);
    
    this.setState({ tables });
  }

  buildTower = (inputObj) => {
    const newTables = [];
    const { count } = inputObj;
    
    this.setState(
      {
        tables: newTables,
        count: "0"
      },
      () => {
        const { tables } = this.state;
        const towerObj = {
          id: inputObj.id,
          A: [],
          B: [],
          C: []
        };
        
        for (let i = 1; i <= count; i++) {
          towerObj.A.push(i);
        }
        
        tables.push(towerObj);
        this.setState(
          {
            tables,
            count
          },
          () => {
            this.buildTowers(count, 'A', 'B', 'C');
          }
        );
      }
    );
  }

  render() {
    const { tables, count } = this.state;
    return (
      <div className="hanoi-container">
        <div className="hanoi-wrap">
          <Header buildTower={this.buildTower} />
          <List tables={tables} count={count} />
        </div>
      </div>
    )
  }
}
