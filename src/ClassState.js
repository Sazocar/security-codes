import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: false,
      value: "",
    };
  }

  componentDidUpdate() {
    if (this.state.loading == true) {
      setTimeout(() => {
        if (SECURITY_CODE === this.state.value) {
          this.setState({ error: false });
        } else {
          this.setState({ error: true });
        }

        this.setState({ loading: false });
      }, 2000);
    }
  }

  render() {
    // A way to rename this states
    // const { error, loading, value } = this.state;

    return (
      <div>
        <h2>Delete {this.props.name}</h2>

        <p>Please, enter your security code.</p>

        {this.state.error && <p>Error: security code is incorrect</p>}
        {this.state.loading && <Loading />}

        <input
          placeholder="Security code"
          value={this.state.value}
          onChange={(event) => this.setState({ value: event.target.value })}
        />
        <button onClick={() => this.setState({ error: false, loading: true })}>
          Check
        </button>
      </div>
    );
  }
}

export { ClassState };
