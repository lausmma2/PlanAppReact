import React, { Component } from 'react';
import "../../css/sidebar.css";

export default class Sidebar extends Component {
    render() {
        return (
            <div>
                <div class="sidenav">
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#clients">Clients</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
        )
    }
}
