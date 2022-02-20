import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { ErrorMessage, FormikProps } from 'formik';
import React, { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import { EntryType } from '../types';

type EntryOptionsType = {
  key: EntryType
  text: string
  value: EntryType
};

const EntryTypeField = ({
  setFieldValue,
  setFieldTouched,
  setEntryType
}: {
  setFieldValue: FormikProps<{ type: EntryType }>["setFieldValue"];
  setFieldTouched: FormikProps<{ type: EntryType }>["setFieldTouched"];
  setEntryType: Dispatch<SetStateAction<EntryType>>
}) => {
  
  const entryOptions: EntryOptionsType[] = [
    {
      key: EntryType.Hospital,
      text: "Hospital",
      value: EntryType.Hospital
    },
    {
      key: EntryType.OccupationalHealthCare,
      text: "OccupationalHealthCare",
      value: EntryType.OccupationalHealthCare
    },
    {
      key: EntryType.HealthCheck,
      text: "HealthCheck",
      value: EntryType.HealthCheck
    },
  ];

  const field = "type";
  const onChange = (
    _event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldValue(field, data.value);
    setFieldTouched(field, true);
    setEntryType(data.value as EntryType);
  };

  return (
    <Form.Field>
      <label>Entry type</label>
      <Dropdown
        fluid
        search
        selection
        placeholder="Entry"
        options={entryOptions}
        onChange={onChange}
      />
      <ErrorMessage name="entry" />
    </Form.Field>
  );
};

export default EntryTypeField;