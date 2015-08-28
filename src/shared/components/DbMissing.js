var React         = window.React,
    omniscient    = require('omniscient/component')(React),
    component     = omniscient.withDefaults({jsx: true});

var DbMissing = component('DbMissing', function (props) {
  return (
    <div className="not-found">
      <h2>Suunto Dive Manager not found</h2>
      <p>The application could not find Suunto Dive Manager installed on your computer.</p>
      <p>
        If you do have it installed this must be a bug. Please submit an issue on the projects
        <a href="http://www.github.com/TODO">github page</a>.
      </p>
    </div>
  );
});

module.exports = DbMissing;
