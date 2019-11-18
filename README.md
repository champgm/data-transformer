# data-transformer

## Assumptions
 * Input data will be available as a stream
 * Mapping specification will be available as a YAML file
 * Numbers will have decimal separators

## Dependencies
 * [js-yaml](https://github.com/nodeca/js-yaml) to parse YML files and apply custom tags
 * [csv-parse](https://github.com/adaltas/node-csv-parse) to parse CSV files
 * [lodash](https://github.com/lodash/lodash) safe, readable retrieval of nested values

## Mapping DSL

The mappings should be defined in YAML format. Examples can be found in [the lib folder](https://github.com/champgm/data-transformer/tree/master/lib).

In addition to typical YAML tags, ones to assist in mapping have been added:
 * `!Concat` - String construction, similar to [CloudFormation's !Sub](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)
 * `!Ref` - References values in the input Datum

### Types
 * Number
 * Date
 * Boolean
 * String


## Next Steps
 * Make delimiter configurable
 * Add more Types, e.g. Regex
 * Add more transformation implementations, maybe `!Sum`, `!Difference`, `!Uppercase`, whatever might be needed
