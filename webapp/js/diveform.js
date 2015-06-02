var DiveForm = React.createClass({
  getInitialState: function () {
    return {
      selectedWeather: 0,
      weatherOptions: [
        { value: 0, name: 'Not set' },
        { value: 1, name: 'Partly Cloudy' },
        { value: 2, name: 'Sunny' },
        { value: 3, name: 'Cloudy' },
        { value: 4, name: 'Light Rain' },
        { value: 5, name: 'Heavy Rain' },
        { value: 6, name: 'Snowfall' },
        { value: 7, name: 'Dark' },
        { value: 8, name: 'Indoor' },
      ],
      divemodeOptions: [
        { value: 0, name: 'Air' },
        { value: 1, name: 'EAN' },
        { value: 2, name: 'Gauge' },
        { value: 3, name: 'Free' },
      ]
    }
  },
  handleChange: function (e) {
    this.props.onDiveChange({
      maxDepth: React.findDOMNode(this.refs.maxDepth).value,
      bottomTime: React.findDOMNode(this.refs.bottomTime).value,
      surfaceTemp: React.findDOMNode(this.refs.surfaceTemp).value,
      bottomTemp: React.findDOMNode(this.refs.bottomTemp).value,
      weather: this.refs.weather.getCheckedValue(),
      divemode: this.refs.divemode.getCheckedValue()
    });
  },
  render: function () {
    return (
      <form>
        <label>
          Max Depth
          <input type="number" ref="maxDepth" value={this.props.dive.maxDepth} onChange={this.handleChange} />
        </label>
        <label>
          Bottom Time
          <input type="number" ref="bottomTime" value={this.props.dive.bottomTime} onChange={this.handleChange} />
        </label>
        <label>
          Surface Temperature
          <input type="number" ref="surfaceTemp" value={this.props.dive.surfaceTemp}  onChange={this.handleChange} />
        </label>
        <label>
          Bottom Temperature
          <input type="number" ref="bottomTemp" value={this.props.dive.bottomTemp} onChange={this.handleChange} />
        </label>
        <ImageRadioGroup
          name="weather"
          ref="weather"
          value={this.props.dive.weather}
          options={this.state.weatherOptions}
          onChange={this.handleChange} />
        <ImageRadioGroup
          name="divemode"
          ref="divemode"
          value={this.props.dive.divemode}
          options={this.state.divemodeOptions}
          onChange={this.handleChange} />
      </form>
    );
  }
});
