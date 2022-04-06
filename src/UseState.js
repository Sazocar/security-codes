import React from "react";

const SECURITY_CODE = "paradigma";

const UseState = (props) => {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  console.log(state);

  React.useEffect(() => {
    if (state.loading == true) {
      setTimeout(() => {
        if (state.value != SECURITY_CODE) {
          setState({
            ...state,
            error: true,
            loading: false,
          });
        } else {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          });
        }
      }, 2000);
    }
  }, [state.loading]);

  if (state.deleted == false && state.confirmed == false) {
    return (
      <div>
        <h2>Delete {props.name}</h2>

        <p>Please, enter your security code.</p>

        {state.error == true && <p>Error: security code is incorrect</p>}
        {state.loading && <p>Loading...</p>}

        <input
          placeholder="Security code"
          value={state.value}
          onChange={(event) =>
            setState({
              ...state,
              value: event.target.value,
            })
          }
        />
        <button
          onClick={() => {
            setState({
              ...state,
              loading: true,
              error: false,
            });
          }}
        >
          Check
        </button>
      </div>
    );
  } else if (state.confirmed == true && state.deleted == false) {
    return (
      <React.Fragment>
        <h2>Delete {props.name}</h2>

        <p>Are you sure you want to delete UseState?</p>
        <button
          onClick={() =>
            setState({
              ...state,
              deleted: true,
            })
          }
        >
          Yes, delete it
        </button>
        <button
          onClick={() =>
            setState({
              ...state,
              confirmed: false,
              value: "",
            })
          }
        >
          No, cancel
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Deleted successfully!</p>
        <button
          onClick={() =>
            setState({
              ...state,
              value: "",
              confirmed: false,
              deleted: false,
            })
          }
        >
          Recover UseState
        </button>
      </React.Fragment>
    );
  }
};

export { UseState };
