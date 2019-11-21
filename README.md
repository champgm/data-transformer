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

The mappings should be defined in YAML format. Examples can be found in [the examples folder](https://github.com/champgm/data-transformer/tree/master/examples).

# Accepted Types
 * Number
 * Date
 * Boolean
 * String

# Custom YAML Types
 * `!Concat` - String construction, similar to [CloudFormation's !Sub](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)
 * `!Ref` - References values in the InputSpecification section of the yaml file


## Next Steps
 * Make delimiter configurable
 * Add more Types, possibly even nested objects
 * Make transformations more robust, especially Date
 * Add more transformation implementations, maybe `!Sum`, `!Difference`, `!Uppercase`, whatever is needed
