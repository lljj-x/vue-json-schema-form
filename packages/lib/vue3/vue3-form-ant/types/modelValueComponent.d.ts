declare function modelValueComponent(
    baseComponent: object | String | Function,
    options: {
        model: String
    },
    rootSchema: object,
    includeUndefinedValues?: boolean,
): any;

export default modelValueComponent;
