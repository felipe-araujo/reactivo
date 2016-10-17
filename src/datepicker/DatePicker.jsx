import React, { PropTypes } from 'react';
import dialogPolyfill from 'dialog-polyfill';
import moment from 'moment';
import Calendar from './Calendar.jsx';

class DatePicker extends React.Component {

  state = {
    date: null,
  }

  componentWillMount() {
    this.setState({
      date: moment(this.props.date),
    });
  }

  componentDidMount() {
    dialogPolyfill.registerDialog(this.refs.dialog);
  }

  onClick = () => {
    this.refs.dialog.show();
  }

  onClose = () => {
    this.refs.dialog.close();
  }

  onChange = (date) => {
    const { onChange } = this.props;
    this.setState({ date }, () => {
      if (onChange) {
        onChange(this.state.date);
      }
      this.onClose();
    });
  }

  render() {
    const { date } = this.state;
    const value = date.format('DD/MM/YYYY');

    return (
      <div>
        <div>
          <input value={value} readOnly onClick={this.onClick} type="text" />
        </div>
        <div>
          <dialog ref="dialog">
            <Calendar
              date={date}
              onClose={this.onClose}
              onChange={this.onChange}
            />
          </dialog>
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(moment),
};

export default DatePicker;