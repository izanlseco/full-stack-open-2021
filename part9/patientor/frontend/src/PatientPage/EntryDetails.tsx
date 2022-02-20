import { Entry, EntryType } from '../types';

import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import React from 'react';
import { assertNever } from '../utils';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryType.OccupationalHealthCare:
      return <OccupationalHealthcareEntry entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;