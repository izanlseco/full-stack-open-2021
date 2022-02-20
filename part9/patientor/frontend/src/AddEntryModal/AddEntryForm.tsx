import * as yup from 'yup';

import { Button, Divider, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { Entry, EntryType, HealthCheckRating, NewEntry } from '../types';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import EntryTypeField from './EntryTypeField';
import ExtraTypes from './ExtraTypes';
import { useStateValue } from '../state';

/*
 * use type Entry, but omit id,
 * because it is irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void
  onCancel: () => void
}

const baseSchema = yup.object().shape({
  description: yup.string().min(12).required(),
  date: yup
    .string()
    .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
    .required(),
  specialist: yup.string().min(6).required(),
  diagnosisCodes: yup.array().of(yup.string()),
});

const hospitalSchema = baseSchema.concat(
  yup.object().shape({
    discharge: yup
      .object({
        date: yup
          .string()
          .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
          .required("discharge date is a required field"),
        criteria: yup
          .string()
          .min(12)
          .required("discharge criteria is a required field"),
      })
      .required(),
  })
);

const healthCheckSchema = baseSchema.concat(
  yup.object().shape({
    healthCheckRating: yup
      .number()
      .typeError("health check rating must be a number")
      .min(0)
      .max(3)
      .required("Please enter a rating from 0(great) - 3(critical)"),
  })
);

const occupationalHealthCareSchema = baseSchema.concat(
  yup.object().shape({
    employerName: yup.string().min(3).required(),
    sickLeave: yup.object().shape({
      startDate: yup
        .string()
        .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
      endDate: yup
        .string()
        .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
    }),
  })
);

const baseInitialValues = {
  type: EntryType,
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
};

const initialValuesHospital: NewEntry = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  discharge: {
    date: "",
    criteria: ""
  }
};

const initialValuesHealthCheck: NewEntry = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: HealthCheckRating.Healthy
};

const initialValuesOccupationalHealthCare: NewEntry = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthCare,
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: ""
  }
};

let initialValues: NewEntry = initialValuesOccupationalHealthCare;
let schema: yup.ObjectSchema = occupationalHealthCareSchema;

export const AddEntryForm = ({ onSubmit, onCancel } : Props) => {
  const [{ diagnoses }] = useStateValue();
  const [entryType, setEntryType] = useState<EntryType>(EntryType.OccupationalHealthCare);

  useEffect(() => {
    switch (entryType) {
      case "Hospital":
        initialValues = initialValuesHospital;
        schema = hospitalSchema;
        break;
      case "HealthCheck":
        initialValues = initialValuesHealthCheck;
        schema = healthCheckSchema;
        break;
      default:
        initialValues = initialValuesOccupationalHealthCare;
        schema = occupationalHealthCareSchema;
    }
  }, [entryType]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
        <Form className="form ui">
          <EntryTypeField
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            setEntryType={setEntryType}
          />
          <Divider />
          <ExtraTypes entryType={entryType} />
          <Divider />
          <Field 
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field 
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field 
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button
                type="button"
                onClick={onCancel}
                color="red"
              >
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                type="submit"
                floated="right"
                color="green"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntryForm;