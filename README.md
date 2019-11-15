# crisp-takehome

## Assumptions
 * The instructions say, `without (significant) external dependencies`, so I guess that means some kind of

## Dependencies
 * [js-yaml](https://github.com/nodeca/js-yaml) to parse YML files with custom tags

## Mapping DSL

### Types
 * Number
 * Date
 * Boolean
 * String

### Transformations
 * `!Sub` - String substitution, similar to [CloudFormation's implementation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)

## Next Steps
 * Add more Types, e.g. Regex
 * Add more transformation implementations, maybe `!Sum`, `!Difference`, `!Uppercase`, whatever might be needed