import _ from 'lodash'
import flatten from 'flat'

export default function isSameJsonSchema(obj1, obj2) {
  return _.isEqual(Object.keys(flatten(obj1)), Object.keys(flatten(obj2)))
}
