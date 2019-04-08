import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Home extends PureComponent {
    render() {
        return <div>
            <h2>HOME</h2>
        </div>
    }
}

const mapStateToProps = state => {

    return {

    }
}

export default connect(mapStateToProps, {

})(Home);