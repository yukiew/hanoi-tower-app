import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
    // 如果塔的高度不足，則會用""補足，用意是去方便畫表
    fullArray(array, count) {
        const temp = [...array];
        while (temp.length < count) {
            temp.unshift('');
        }
        return temp
    }

    render() {
        const { table, index, count } = this.props
        const { A, B, C } = table
        const a = this.fullArray(A, count)
        const b = this.fullArray(B, count)
        const c = this.fullArray(C, count)
        // 以下則是以數據畫出table
        return (
            // 事件回調得返回值必須是函數
            <div className="hanoi-item">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3">{index + 1}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: count }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{a[rowIndex]}</td>
                                <td>{b[rowIndex]}</td>
                                <td>{c[rowIndex]}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>{'A'}</td>
                            <td>{'B'}</td>
                            <td>{'C'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}