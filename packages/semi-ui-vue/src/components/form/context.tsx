/* eslint-disable @typescript-eslint/no-empty-function */
import FormStateProvider from "./context/FormState/Provider";
import FormStateConsumer from "./context/FormState/Consumer";
import BaseFormApiProvider from "./context/BaseFormApi/Provider";
import BaseFormApiConsumer from "./context/BaseFormApi/Consumer";
import FormUpdaterProvider from "./context/FormUpdaterContext/Provider";
import FormUpdaterConsumer from "./context/FormUpdaterContext/Consumer";
import ArrayFieldProvider from "./context/ArrayField/Provider";
import ArrayFieldConsumer from "./context/ArrayField/Consumer";

const FormStateContext = {
    Provider:FormStateProvider,
    Consumer:FormStateConsumer,
    displayName: 'FormState'
};

const FormApiContext = {
    Provider:BaseFormApiProvider,
    Consumer:BaseFormApiConsumer,
    displayName: 'FormApi'
};

const FormUpdaterContext = {
    Provider:FormUpdaterProvider,
    Consumer:FormUpdaterConsumer,
    displayName: 'FormUpdater'
};

const ArrayFieldContext = {
    Provider:ArrayFieldProvider,
    Consumer:ArrayFieldConsumer,
};

export {
    FormStateContext,
    FormApiContext,
    FormUpdaterContext,
    ArrayFieldContext
};
