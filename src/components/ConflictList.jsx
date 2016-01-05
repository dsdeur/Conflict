import './ConflictList.scss';
import React, { PropTypes } from 'react'
import ConflictItem from './ConflictItem.jsx';

class ConflictList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAll: false
        }
    }

    componentWillUpdate(prevProps, prevState) {
        if(prevProps.selectedYear !== this.props.selectedYear && this.state.showAll) {
            this.setState({showAll: false});
        }
    }

    toggleShowAll() {
        this.setState({showAll: !this.state.showAll});
    }

    getConflicts(conflicts) {
        return (this.state.showAll) ? conflicts : conflicts.slice(0, 10);
    }

    render () {
        let {conflicts, ...props} = this.props;

        return (
            <div className="Stats__Conflicts">
                {this.getConflicts(conflicts).map((conflict) => {
                    return <ConflictItem
                        {...props}
                        conflict={conflict}
                        key={conflict.dyadId + '_all'}
                    />;
                })}

                {(!this.state.showAll) ?
                    <button className="more" onClick={this.toggleShowAll.bind(this)}>Show more</button>
                : null}
            </div>
        )
    }
}

export default ConflictList;
