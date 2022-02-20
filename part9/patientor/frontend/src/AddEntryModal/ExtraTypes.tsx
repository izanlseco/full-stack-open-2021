import { NumberField, TextField } from '../AddPatientModal/FormField';

import { EntryType } from '../types';
import { Field } from 'formik';
import React from 'react';

const ExtraTypes = ({ entryType }: {entryType: EntryType}) => {
    switch (entryType) {
      case "Hospital":
        return (
          <div>
            <Field 
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field 
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
          </div>
        );
      case "HealthCheck":
        return (
            <Field 
              label="Health check rating"
              placeholder="Health check rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
        );
      default:
        return (
          <div>
            <Field 
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field 
              label="Start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field 
              label="End date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </div>
        );
    }
};

export default ExtraTypes;