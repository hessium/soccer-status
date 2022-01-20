import React from "react";
import { FormSpy } from "react-final-form";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import Spinner from "../component/Spinner/Spinner";

class AutoSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitting: false };
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { debounce } = this.props;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (!isEqual(this.props.values, nextProps.values)) {
      this.timeout = setTimeout(this.save, debounce);
    }
  }

  save = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const { values, save } = this.props;

    if (Object.keys(values).length) {
      this.setState({ submitting: true });
      save(values);
      await sleep(2000);
      this.setState({ submitting: false });
      delete sleep();
    }
  };

  render() {
    return (
      this.state.submitting && (
        <div>
          <Spinner size={2} />
        </div>
      )
    );
  }
}

AutoSave.defaultProps = {
  values: null,
  debounce: 0,
};

AutoSave.propTypes = {
  save: PropTypes.func.isRequired,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  debounce: PropTypes.number,
};

// eslint-disable-next-line
export default (props) => (
  <FormSpy {...props} subscription={{ values: true }} component={AutoSave} />
);
