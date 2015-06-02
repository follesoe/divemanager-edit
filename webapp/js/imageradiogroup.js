var ImageRadioGroup = React.createClass({
  getInitialState: function() {
    return { defaultValue: this.props.defaultValue };
  },
  componentDidMount: function() { this.setCheckedRadio(); },
  componentDidUpdate: function() { this.setCheckedRadio(); },
  getRadios: function () {
    return this.getDOMNode().querySelectorAll('input[type="radio"]');
  },
  setCheckedRadio: function() {
    var $radios = this.getRadios();

    var destinationValue = this.props.value != null
      ? this.props.value
      : this.state.defaultValue;

    for (var i = 0, length = $radios.length; i < length; i++) {
      var $radio = $radios[i];
      if ($radio.value == destinationValue) {
        $radio.checked = true;
      }
    }
  },
  getCheckedValue: function() {
    var $radios = this.getRadios();
    for (var i = 0, length = $radios.length; i < length; i++) {
      if ($radios[i].checked) {
        return $radios[i].value;
      }
    }
    return null;
  },
  render: function () {
    var inputNodes = this.props.options.map(function (option) {
      return (
        <label key={option.value}>
          <span>{option.name}</span>
          <input
            type="radio"
            name={this.props.name}
            value={option.value}
            onChange={this.props.onChange} />
          <br />
        </label>
      );
    }.bind(this));
    return (
      <div>
        {inputNodes}
      </div>
    );
  }
});
