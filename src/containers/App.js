import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => ({
    searchField: state.searchField
});

const mapDispatchToProps = dispatch => ({
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: []
        };
    }

    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(
            robot => robot.name.toLowerCase().includes(searchField.toLowerCase())
        );
        if (robots.length) {
            return (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        } else {
            return <h1 className='tc'>Loading</h1>;
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
