/**
 * Created by Liu.Jun on 2020/4/20 9:55 下午.
 */

// eslint-disable-next-line import/no-cycle
import ObjectField from '../fields/ObjectField';

// eslint-disable-next-line import/no-cycle
import StringField from '../fields/StringField';

// eslint-disable-next-line import/no-cycle
import NumberField from '../fields/NumberField';

// eslint-disable-next-line import/no-cycle
import BooleanField from '../fields/BooleanField';

// eslint-disable-next-line import/no-cycle
import ArrayField from '../fields/ArrayField';

// 默认类型使用field映射关系
const COMPONENT_TYPES = {
    array: 'ArrayField',
    boolean: 'BooleanField',
    integer: 'NumberField',
    number: 'NumberField',
    object: 'ObjectField',
    string: 'StringField',
    null: 'NullField'
};

// 系统内置的 field组件
const FIELDS_MAPS = {
    ArrayField,
    BooleanField,
    NumberField,
    ObjectField,
    StringField,
    NullField: 'NullField'
};

export {
    COMPONENT_TYPES,
    FIELDS_MAPS
};
