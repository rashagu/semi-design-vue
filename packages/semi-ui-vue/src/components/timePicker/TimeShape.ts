
import * as PropTypes from '../PropTypes'

const PlainTimeShape = [PropTypes.string, PropTypes.number, PropTypes.object];

/**
 * Can be
 * - 12:00:12
 * - \[12:00:12]
 * - \[12:00:12, 12:21:12]
 * - \[[12:00:12, 12:21:12], [12:11:12, 12:32:12]]
 */
const TimeShape = [
    ...PlainTimeShape,
    Array,
];

export { TimeShape };
