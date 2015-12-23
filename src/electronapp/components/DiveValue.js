var React         = window.React || require('react'),
    component     = require('omniscient');

var DiveValue = component('DiveValue', function (props) {
  return (
    <div className="dive-data">
      <h2>{this.props.label}</h2>
      <div>
        <img src={'./images/' + this.props.icon + '.png'} />
        <h3>{this.props.value.valueOf()}</h3>
        <h4>{this.props.unit}</h4>
      </div>
    </div>
  );
});

module.exports = DiveValue;
