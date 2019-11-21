# data-transformer

## Assumptions
 * Raw CSV data will be available as a stream
 * Mapping specification will be available in YAML format according to the DSL
 * Numbers will have decimal, not comma, separators

## Dependencies
 * [js-yaml](https://github.com/nodeca/js-yaml) to parse YAML files and apply custom tags
 * [csv-parse](https://github.com/adaltas/node-csv-parse) to parse CSV files
 * [stream-transform](https://github.com/adaltas/node-stream-transform) an extension of [Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform) used for ease and readability when transforming data in a stream

## Mapping DSL
The mappings should be defined in YAML format. Examples can be found in [the examples folder](https://github.com/champgm/data-transformer/tree/master/examples). The specification should include three top-level sections, `InputSpecification`, `OutputSpecification`, and `MappingSpecification`. Input and Output fields must have a Type, valid values are detailed below. Output fields may include a specified `Default` value. `MappingSpecification` objects' `Input` fields should consist of one or more mapping types, also detailed below.

### Supported Input and Output Types
 * Number
 * Date
 * Boolean
 * String

### Supported Mapping Types
 * `!Concat` - String construction, similar to [CloudFormation's !Sub](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)
 * `!Ref` - References values in the InputSpecification section of the yaml file

# Setup and Demonstration
The project depends on Node.js and NPM. You can find out more about how to install those [here](https://www.npmjs.com/get-npm). Once that's taken care of, ideally, all project dependencies should be installed by running the following command:
```bash
npm install
```

There are two example scripts in the `examples` folder. Each transforms example data using different method. They can be run with one of the following commands:
```bash
npm run example:stream
npm run example:transform
```

There is also a convenience command to process custom example data with user-defined specifications. Running that looks something like this:
```
⇒  npm run example:input

> data-transformer@1.0.0 example:input /Users/gchampion/github/data-transformer
> ts-node examples/custom-input-example.ts

? Input the path to the specification file you wish to transform examples/TransformationSpecification.yml
? Input the path to the CSV file you wish to transform examples/ExampleInput.csv
Loading example CSV input from file, 'examples/ExampleInput.csv'...

Loading transformation specification from file, 'examples/TransformationSpecification.yml'...

Outputting data from DataTransformer's configured stream...
{"datum":{"Order Number":"1000","Year":"2018","Month":"1","Day":"1","Product Number":"P-10001","Product Name":"Arugola","Count":"5,250.50","Extra Col1":"Lorem","Extra Col2":"Ipsum","Empty Column":""},"errors":[],"success":true,"transformedDatum":{"OrderId":1000,"OrderDate":"2018-01-01T05:00:00.000Z","ProductId":"P-10001","ProductName":"Arugola","Quantity":0,"Unit":"kg"}}{"datum":{"Order Number":"1001","Year":"2017","Month":"12","Day":"12","Product Number":"P-10002","Product Name":"Iceberg lettuce","Count":"500.00","Extra Col1":"Lorem","Extra Col2":"Ipsum","Empty Column":""},"errors":[],"success":true,"transformedDatum":{"OrderId":1001,"OrderDate":"2017-12-12T00:00:00.000Z","ProductId":"P-10002","ProductName":"Iceberg lettuce","Quantity":0,"Unit":"kg"}}
```

## Library Usage


# Next Steps
 * Make delimiter and other parsing options configurable (or flesh out documentation on self-configuring `csv-parse` and using the data transformer directly)
 * Support more Types, possibly even nested objects
 * Make transformations more robust, especially `Date`
 * Support more transformation types, maybe `!Sum`, `!Difference`, `!Uppercase`, whatever is needed
 * Allow multiple `InputSpecification` definitions to join and transform data sets
