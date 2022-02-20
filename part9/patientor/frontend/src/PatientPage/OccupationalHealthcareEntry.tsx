import { Card, Icon } from 'semantic-ui-react';

import DiagnosisList from './DiagnosisList';
import { OccupationalHealthcare } from '../types';
import React from 'react';

const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthcare}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name='user doctor' /></Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>Employer: {entry.employerName}</Card.Description>
        <Card.Description extra>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntry;