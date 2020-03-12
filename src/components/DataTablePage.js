import React, { Component } from 'react';
import "../css/dataTable.css";

class TablePage extends Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            //items: [],
            headers: [{
                name: '',
                add: ''
            }]
        }
    }

    onClick(title, latitude, longitude, vicinity, distance) {
        console.log("click:)")
    }

    renderTableHeader() {
        let header = Object.keys(this.state.headers[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        const { items } = this.props.props.places.places.results;
        return items.map((item, index) => {
            return (
                <tr key={index}>
                    <td id='name'>{item.title} - {item.distance}m</td>
                    <button class="fas fa-check" onClick={this.onClick.bind(this)}></button>
                </tr>
            )
        })
    }

    render() {
        //console.log("----")
        //console.log(this.props)
        return (
            <div>
                <h1 id='title'>Found places</h1>
                <table id='items'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default TablePage;