/**
 * Created by Liu.Jun on 2020/5/17 10:18 下午.
 */

let sliderName = 'el-slider';
const sliderNameRules = {
    'ui=VueAntForm': 'SliderWidget',
    'ui=VueIview3Form': 'slider'
};

const curUrl = window.location.href;
Object.entries(sliderNameRules).some(([key, value]) => {
    const isInclude = ~curUrl.indexOf(key);

    if (isInclude) {
        sliderName = value;
        return true;
    }

    return false;
});


export default {
    schema: {
        type: 'object',
        title: 'Number fields & widgets',
        properties: {
            number: {
                title: 'Number',
                type: 'number',
            },
            integer: {
                title: 'Integer',
                type: 'integer',
            },
            numberEnum: {
                type: 'number',
                title: 'Number enum (select)',
                enum: [1, 2, 3],
                enumNames: ['Select - 1', 'Select - 2', 'Select - 3']
            },
            numberEnumRadio: {
                type: 'number',
                title: 'Number enum (radio)',
                enum: [1, 2, 3],
                enumNames: ['Radio - 1', 'Radio - 2', 'Radio - 3']
            },
            integerRange: {
                title: 'Integer range',
                type: 'integer',
                minimum: 42,
                maximum: 100,
            },
            integerRangeSteps: {
                title: 'Integer range (by 10)',
                type: 'integer',
                minimum: 50,
                maximum: 100,
                multipleOf: 10,
            },
        },
    },
    uiSchema: {
        numberEnumRadio: {
            'ui:widget': 'RadioWidget',
            'ui:enumNames': ['ui-radio1', 'ui-radio2', 'ui-radio3']
        },
        integerRange: {
            'ui:widget': sliderName
        },
        integerRangeSteps: {
            'ui:widget': sliderName
        },
    },
    formData: {
        number: 3.14,
        integer: 42,
        numberEnum: 2,
        integerRange: 42,
        integerRangeSteps: 80,
    },
};
