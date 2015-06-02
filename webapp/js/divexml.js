var DiveXml = React.createClass({
  generateXml: function (dive) {
    return '<Dive \r\n'
          +'  xmlns:i="http://www.w3.org/2001/XMLSchema-instance"\r\n'
          +'  xmlns="http://schemas.datacontract.org/2004/07/Suunto.Diving.Dal">\r\n'
          +'  <MaxDepth>' + dive.maxDepth + '</MaxDepth>\r\n'
          +'  <BottomTime>' + dive.bottomTime + '</BottomTime>\r\n'
          +'  <StartTemperature>' + dive.surfaceTemp + '</StartTemperature>\r\n'
          +'  <BottomTemperature>' + dive.bottomTemp + '</BottomTemperature>\r\n'
          +'  <EndTemperature>' + dive.surfaceTemp + '</EndTemperature>\r\n'
          +'  <Weather>' + dive.weather + '</Weahter>\r\n'
          +'  <Mode>' + dive.divemode + '</Mode>\r\n'
          +'  <Boat>' + dive.boatName.trim() + '</Boat>\r\n'
          +'</Dive>';
  },
  render: function () {
    var xml = this.generateXml(this.props.dive);
    return (
      <section>
        <pre>
          {xml}
        </pre>
      </section>
    );
  }
});
