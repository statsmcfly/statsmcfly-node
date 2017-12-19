# Stats McFly API Module for Node.js

This a module to make interacting with the [statsmcfly.com](https://statsmcfly.com)
API easy.

## Install

```
    npm install --save statsmcfly
```

## Example

```javascript
    var statsmcfly = require('statsmcfly');
	statsmcfly.settings({
		apikey: 'myapikey',
        project: 'myprojectkey'
	});

    statsmcfly.track({
        event:'new user sign up',
        value:'1'
    }, function(err, response) {
        console.log("err: " + err);
        console.log("response:   " + response);
    });

    //  or use JSON:

    statsmcfly.track({
        event:'user log in',
        value: {
            name: "Bailey",
            email: "bailey@statsmcfly.com"
        }
    }, function(err, response) {
        console.log("err: " + err);
        console.log("response:   " + response);
    });
```

If you pass

## Methods

### statsmcfly.settings( {apikey:'', project:''} )

- `apikey`: your api key
- `project`: your project key

### statsmcfly.track( {event:'', value:1}, callback)

- `event`: name of event to track
- `value`: value you want to store. can be numbers, strings or json objects
- `timestamp`: unix timestamp _optional_
