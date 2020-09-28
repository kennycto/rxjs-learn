import React from "react";

export default class List extends React.PureComponent {
    render() {
        return (
            <>
                <ul>
                    {this.props.items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </>
        );
    }
}
