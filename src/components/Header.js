import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <header className="top">
            <h1>
                好多
                <span className="ofThe">
                    <span className="of">🐟</span>
                    <span className="the">🐟</span>
                </span>
                鱼
            </h1>
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>
    );
}

Header.propTypes = {
    tagline: PropTypes.string
};

export default Header;