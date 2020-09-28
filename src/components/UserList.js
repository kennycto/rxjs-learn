import React from "react";

export default class UserList extends React.PureComponent {
    render() {
        return (
            <>
                <ul>
                    {this.props.items.map((item) => (
                        <li key={item.id}>{item.login}</li>
                    ))}
                </ul>
            </>
        );
    }
}
