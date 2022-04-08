import React from "react";

const SECURITY_CODE = "paradigma";

const UseReducer = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm });
  };

  const onError = () => {
    dispatch({ type: actionTypes.error });
  };

  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value });
  };

  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  };

  const onReset = () => {
    dispatch({ type: actionTypes.reset });
  };

  React.useEffect(() => {
    if (state.loading == true) {
      setTimeout(() => {
        if (state.value != SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
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
          onChange={onWrite}
        />
        <button onClick={onCheck}>Check</button>
      </div>
    );
  } else if (state.confirmed == true && state.deleted == false) {
    return (
      <React.Fragment>
        <h2>Delete {props.name}</h2>

        <p>Are you sure you want to delete UseState?</p>
        <button onClick={onDelete}>Yes, delete it</button>
        <button onClick={onReset}>No, cancel</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Deleted successfully!</p>
        <button onClick={onReset}>Recover UseState</button>
      </React.Fragment>
    );
  }
};

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  write: "WRITE",
  delete: "DELETE",
  reset: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
    error: false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    value: "",
    confirmed: false,
    deleted: false,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
