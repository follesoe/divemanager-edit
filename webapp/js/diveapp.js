var DiveApp = React.createClass({
  handleDiveChange: function (dive) {
    this.setState({dive: dive});
  },
  getInitialState: function () {
    return {
      dive: {
        maxDepth: 0,
        surfaceTemp: 0,
        bottomTemp: 0,
        weather: 0,
        divemode: 0
      }
    }
  },
  render: function () {
    return (
      <section>
        <DiveForm dive={this.state.dive} onDiveChange={this.handleDiveChange} />
        <DiveXml dive={this.state.dive} />
      </section>
    );
  }
});
