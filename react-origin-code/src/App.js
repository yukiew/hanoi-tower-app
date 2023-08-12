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
    // 取得state中的tables, count對象
    const { tables, count } = this.state;
    // 新增一個表單對象 
    let towerObj = JSON.parse(JSON.stringify(tables[tables.length - 1]));
    // eslint-disable-next-line
    if (n == 1) {
      // 將此圓盤從sourceTower移動到targetTower
      towerObj[targetTower].unshift(towerObj[sourceTower].shift());
      // 為此towerObj對象新增一個id
      towerObj.id = nanoid();
      // 將tables新增到tables中
      tables.push(towerObj);
      // eslint-disable-next-line
      if (count == 1) {
        this.setState({ tables });
      }
      return;
    }
    
    // 將上方圓盤移動到暫存塔上
    this.buildTowers(n - 1, sourceTower, targetTower, tampTower);
    towerObj = JSON.parse(JSON.stringify(tables[tables.length - 1]));
    // 將此圓盤從sourceTower移動到targetTower
    towerObj[targetTower].unshift(towerObj[sourceTower].shift());
    // 為此towerObj對象新增一個id
    towerObj.id = nanoid();
    // 將tables新增到tables中
    tables.push(towerObj);
    // 將暫存塔上圓盤移動到目標塔上
    this.buildTowers(n - 1, tampTower, sourceTower, targetTower);
    
    this.setState({ tables });
  }

  // 讀入輸入正整數並轉換為尚未移動過的河內塔
  // 第一份teble
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
